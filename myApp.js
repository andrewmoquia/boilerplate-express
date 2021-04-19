var express = require('express');
var app = express();
//add env config
require('dotenv').config();
//in heroku we need to config var of key and valeus in config var section

console.log("Hello World");
//add the index.html to our server to display for the client
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//add some files like css or image the server that will support the index.html
app.use('/public', express.static(__dirname +  '/public'));

//add json route to the website with a dummy object
// app.get('/json', (req,res) => {
//     res.json({"message":"Hello json"})
// });

//use .env to configure private data
//we need to install npm install dotenv --save
app.get("/json", (req,res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    }
});





































 module.exports = app;
