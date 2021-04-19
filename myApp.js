var express = require('express');
var app = express();
//add env config
require('dotenv').config();
//in heroku we need to config var of key and valeus in config var section

//add a middleware function
app.use( (req, res, next) => {
    console.log(req.method + " " +req.path + " - " +req.ip)
    next();
} )



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
    const jsonResponse = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        jsonResponse.message = jsonResponse.message.toUpperCase();
    }

    res.json(jsonResponse);
});





































 module.exports = app;
