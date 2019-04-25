const express = require('express');
const path    = require('path');
const mongodb = require('mongodb');
const authentication = require('./authentication');
const PORT = process.env.PORT || 3000;
const staticDirectoryPath = path.join(__dirname, '../static');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb+srv://smolagakuba:SuperHasloJakub0512@pracabezgranic-d69o4.mongodb.net/test?retryWrites=true';
const clusterName = 'PracaBezGranic';

const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

let app = express();
app.use(session({
  secret: 'mamma mia!',
  store: new RedisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 2600}),
  saveUninitalized: false,
  resave: false
}));
app.set('view engine', 'hbs');
app.use(express.static(staticDirectoryPath));
app.use(express.urlencoded());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) return console.log('Unable to connect to database!');
  const db = client.db(clusterName);

  app.get('/',          (req, res) => res.render('index'));
  app.get('/register',  (req, res) => {
    if(req.session && req.session.email) res.redirect('/dashboard');
    else res.render('register')
  });
  app.get('/login',     (req, res) => {
    if(req.session && req.session.email) res.redirect('/dashboard');
    else res.render('login');
  });
  app.get('/dashboard', (req, res) => res.render('dashboard'));
  app.post('/register', (req, res) => {
    authentication.register(req.body, db).then((error) => {
      if(error) res.render('register', {error});
      else res.redirect('/dashboard');
    });
  });
  app.post('/login', (req, res) => {
    authentication.login(req.body, db).then((error) => {
      if(error) res.render('login', {error});
      else{
        req.session.email = req.body.email;
        res.redirect('/dashboard');
      }
    });
  });
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err) return console.log(err);
      res.redirect('/login');
    });
  });
  app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
});
