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

//Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction).
//This approach is useful to split the server operations into smaller units. 

//function to get the current time
function getCurrentTimeString() {
    return new Date().toString();
}

//add middleware
app.get("/now", (req, res, next) => {
    req.time = getCurrentTimeString();
    next();   
}, (req, res) => {
    const jsonResponse = {time: req.time};
    res.json(jsonResponse);
})



































 module.exports = app;
