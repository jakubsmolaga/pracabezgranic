const express = require('express');
const path    = require('path');
const mongodb = require('mongodb');
const auth    = require('./auth');
const offers  = require('./offers');
const PORT = process.env.PORT || 3000;
const staticDirectoryPath = path.join(__dirname, '../static');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb+srv://smolagakuba:SuperHasloJakub0512@pracabezgranic-d69o4.mongodb.net/test?retryWrites=true';
const clusterName = 'PracaBezGranic';

let app = express();
auth.setup(app);
app.set('view engine', 'hbs');
app.use(express.static(staticDirectoryPath));
app.use(express.urlencoded({extended: true}));

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) return console.log('Unable to connect to database!');
  const db = client.db(clusterName);

  app.get('/', (req, res) => res.render('index'));
  app.get('/register', (req, res) => {
    if(req.session.username) return res.redirect('/dashboard');
    res.render('register')
  });
  app.get('/login', (req, res) => {
    if(req.session.username) return res.redirect('/dashboard');
    res.render('login');
  });
  app.get('/dashboard', (req, res) => {
    if(!req.session.username) return res.redirect('/login');
    offers.getByUserId(req.session.userId, db).then((result) => {
      res.render('dashboard', {username: req.session.username, offers: result});
    });
  });
  app.get('/newoffer', (req, res) => {
    if(req.session.username) return res.render('newoffer');
    res.redirect('/login')
  });
  app.get('/offers', (req, res) => {
    offers.getAll(db).then((result) => {
      res.render('offers', {offers: result});
    });
  });
  app.get('/offers/:offerId', (req, res) => {
    offers.getById(req.params.offerId,db).then((result) => {
      if(result.error) return res.redirect('/offers');
      res.render('offer', {offerData:result.data});
    });
  });
  app.post('/register', (req, res) => {
    auth.register(req, db).then((error) => {
      if(error) return res.render('register', {error});
      res.redirect('/dashboard');
    });
  });
  app.post('/login', (req, res) => {
    auth.login(req, db).then((error) => {
      if(error) return res.render('login', {error});
      res.redirect('/dashboard');
    });
  });
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => res.redirect('/login'));
  });
  app.post('/newoffer', (req, res) => {
    if(!req.session.username) return res.redirect('/login');
    offers.add(req, db).then((result) => {
      if(result.errorCode == 1) return res.render('login', {error});
      if(result.errorCode == 2) return res.render('newoffer', {error});
      res.redirect('/offers/'+result.offerId);
    });
  });
  app.post('/removeoffer', (req, res) => {
    if(!req.body.offerId || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body.offerId,db).then((result) => {
      console.log(result);
      if(result.error) return res.redirect('/dashboard');
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard');
      offers.removeById(req.body.offerId, db).then((result) => res.redirect('/dashboard'));
    });
  });
  app.post('/editoffer', (req, res) => {
    if(!req.body.offerId || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body.offerId, db).then((result) => {
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard');
      res.render('editoffer', {offer: result.data});
    });
  });
  app.post('/updateoffer', (req, res) => {
    if(!req.body._id || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body._id, db).then((result) => {
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard')
      offers.update(req.body, db).then((result) => res.redirect('/dashboard'));
    })
  });

  app.get('*', (req,res) => res.redirect('/'));
  app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
});
