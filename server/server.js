const express = require('express');
const path    = require('path');
const mongodb = require('mongodb');
const authentication = require('./authentication');
const PORT = process.env.PORT || 3000;
const staticDirectoryPath = path.join(__dirname, '../static');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb+srv://smolagakuba:SuperHasloJakub0512@pracabezgranic-d69o4.mongodb.net/test?retryWrites=true';
const clusterName = 'PracaBezGranic';

let app = express();
authentication.setup(app);
app.set('view engine', 'hbs');
app.use(express.static(staticDirectoryPath));
app.use(express.urlencoded());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) return console.log('Unable to connect to database!');
  const db = client.db(clusterName);

  app.get('/',          (req, res) => res.render('index'));
  app.get('/register',  (req, res) => {
    if(req.session.username) res.redirect('/dashboard');
    else res.render('register')
  });
  app.get('/login',     (req, res) => {
    if(req.session.username) res.redirect('/dashboard');
    else res.render('login');
  });
  app.get('/dashboard', (req, res) => {
    if(req.session.username) res.render('dashboard', {username: req.session.username});
    else res.redirect('/login');
  });
  app.post('/register', (req, res) => {
    authentication.register(req, db).then((error) => {
      if(error) res.render('register', {error});
      else res.redirect('/dashboard');
    });
  });
  app.post('/login', (req, res) => {
    authentication.login(req, db).then((error) => {
      if(error) res.render('login', {error});
      else res.redirect('/dashboard');
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
