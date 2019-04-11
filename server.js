const express = require('express')
let app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.send("<h1 style='color:pink;'>ŻARTOWAŁEM MIKOŁAJ NIE OBRAŻAJ SIĘ</h1>");
});

app.listen(PORT, ()=>console.log('server is running!'));
