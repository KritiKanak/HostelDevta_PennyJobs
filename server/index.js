const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.get('/',(req,res)=>
{
    res.send("Let Us Begin");
})

app.listen(port, (req,res)=>
{
    console.log("Server is Started....");
})