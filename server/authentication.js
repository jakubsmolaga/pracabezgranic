
// let setupCookies = (app) => {
//   const store = new RedisStore({
//     host: '127', port: process.env.PORT || 3000, pass: 'secret'
//   });
//   app.use(session({
//     store,
//     name: 'pracabezgranic_sid',
//     saveUninitalized: false,
//     resave: false,
//     secret: 'purple haze all in my brain',
//     cookie: {
//       maxAge: 1000*60*60*2,
//       sameSite: true,
//       secure: process.NODE_ENV === 'production'
//     }
//   }));
// };

let register = async (data, db) => {
  if(!(data.username&&data.email&&
      data.phonenumber&&data.password)) return 'Nie udało się utworzyć konta.';
  let user = await db.collection('users').findOne({email: data.email});
  if (user != null) return 'użytkownik o podanym adresie email już istnieje';

  db.collection('users').insertOne({
    username: data.username,
    email: data.email,
    phonenumber: data.phonenumber,
    password: data.password
  });
};
let login = async (data, db) => {
  if(!data.email || !data.password) return 'Nie udało się zalogować.';
  let user = await db.collection('users').findOne({email: data.email});
  if(user == null || data.password != user.password) return 'Nie udało się zalogować.';
}

module.exports = {register, login};
