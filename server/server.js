const express = require('express');
const path    = require('path');
const mongodb = require('mongodb');
const hbs     = require('hbs');
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
let render = (req,res,page,data) => {
  if(!data) data = {};
  data.loggedIn = req.session.userId;
  res.render(page, data);
}
hbs.registerHelper('formatDate', (timestamp) => {
  let date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  if(day<=9) day = '0'+day
  if(month<=9) month = '0'+month
  return day + '-' + month + '-' + year
});

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) return console.log('Unable to connect to database!');
  const db = client.db(clusterName);

  app.get('/', (req, res) => render(req,res,'index'));
  app.get('/register', (req, res) => {
    if(req.session.username) return res.redirect('/dashboard');
    render(req,res,'register');
  });
  app.get('/login', (req, res) => {
    if(req.session.username) return res.redirect('/dashboard');
    render(req,res,'login');
  });
  app.get('/dashboard', (req, res) => {
    if(!req.session.username) return res.redirect('/login');
    offers.getByUserId(db, req.session.userId).then((result) => {
      render(req,res,'dashboard', {username: req.session.username, offers: result});
    });
  });
  app.get('/newoffer', (req, res) => {
    if(req.session.username) return render(req,res,'newoffer');
    res.redirect('/login')
  });
  app.get('/offers', (req, res) => {
    offers.getAll(db).then((result) => {
      render(req,res,'offers', {offers: result});
    });
  });
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => res.redirect('/login'));
  });
  app.get('/offers/:offerId', (req, res) => {
    offers.getById(req.params.offerId,db).then((result) => {
      if(result.error) return res.redirect('/offers');
      render(req,res,'offer', {offerData:result.data});
    });
  });
  app.post('/register', (req, res) => {
    auth.register(req, db).then((error) => {
      if(error) return render(req,res,'register', {error});
      res.redirect('/dashboard');
    });
  });
  app.post('/login', (req, res) => {
    auth.login(req, db).then((error) => {
      if(error) return render(req,res,'login', {error});
      res.redirect('/dashboard');
    });
  });
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => res.redirect('/login'));
  });
  app.post('/newoffer', (req, res) => {
    if(!req.session.username) return res.redirect('/login');
    offers.add(req, db).then((result) => {
      if(result.errorCode == 1) return render(req,res,'login', {error});
      if(result.errorCode == 2) return render(req,res,'newoffer', {error});
      res.redirect('/offers/'+result.offerId);
    });
  });
  app.post('/removeoffer', (req, res) => {
    if(!req.body.offerId || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body.offerId,db).then((result) => {
      if(result.error) return res.redirect('/dashboard');
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard');
      offers.removeById(req.body.offerId, db).then((result) => res.redirect('/dashboard'));
    });
  });
  app.post('/editoffer', (req, res) => {
    if(!req.body.offerId || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body.offerId, db).then((result) => {
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard');
      render(req,res,'editoffer', {offer: result.data});
    });
  });
  app.post('/updateoffer', (req, res) => {
    if(!req.body._id || !req.session.userId) return res.redirect('/dashboard');
    offers.getById(req.body._id, db).then((result) => {
      if(result.data.userId != req.session.userId) return res.redirect('/dashboard')
      offers.update(req.body, db).then((result) => res.redirect('/dashboard'));
    })
  });
  app.post('/offers', (req, res) => {
    if(req.body.industry == 0) delete req.body.industry;
    if(req.body.city == '') delete req.body.city;
    offers.getAll(db, req.body).then((result) => {
      req.body.offers = result;
      render(req,res,'offers', req.body);
    });
  });
  app.get('/info', (req, res) => {
    return res.render('info');
  });

  app.get('*', (req,res) => res.redirect('/'));
  app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));
});
