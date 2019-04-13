const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const staticDirectoryPath = path.join(__dirname, './static')

let app = express();
app.set('view engine', 'hbs');
app.use(express.static(staticDirectoryPath));

app.get('/', (req, res) => res.render('index') );

app.listen(PORT, ()=>console.log('server is running!'));
