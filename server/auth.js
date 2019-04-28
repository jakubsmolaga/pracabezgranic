const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient(process.env.REDIS_URL);

let setup = (app) => {
  app.use(session({
    secret: 'mamma mia!',
    store: new RedisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 3600}),
    saveUninitialized: false,
    resave: false
  }));
};

let register = async (req, db) => {
  let data = req.body;
  if(!data.username || !data.email || !data.phonenumber || !data.password)
    return 'Nie udało się utworzyć konta.';
  let user = await db.collection('users').findOne({email: data.email});
  if (user != null) return 'Użytkownik o podanym adresie email już istnieje';
  let response = await db.collection('users').insertOne({
    username: data.username,
    email: data.email,
    phonenumber: data.phonenumber,
    password: data.password,
    offers: []
  });
  req.session.userId = response.insertedId;
  req.session.username = data.username;
};

let login = async (req, db) => {
  let data = req.body;
  if(!data.email || !data.password) return 'Nie udało się zalogować.';
  let user = await db.collection('users').findOne({email: data.email});
  if(user == null || data.password != user.password) return 'Nie udało się zalogować.';
  req.session.userId =  user._id;
  req.session.username = user.username;
}

module.exports = {setup, register, login};
