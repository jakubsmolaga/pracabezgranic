const express = require('express')
let app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.send("BULWIE WALĄ GIRY");
});

app.listen(PORT, ()=>console.log('server is running!'));
