const express = require('express');
const PORT = process.env.PORT || 3000;

let app = express();
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index') );

app.listen(PORT, ()=>console.log('server is running!'));
