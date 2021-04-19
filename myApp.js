var express = require('express');
var app = express();
//add env config
//in heroku we need to config var of key and valeus in config var section
require('dotenv').config();
var bodyParser = require('body-parser');

//POST is the default method used to send client data with HTML forms.
//In REST convention, 
//POST is used to send data to create new items in the database (a new user, or a new blog post).
//With Ajax, you can also use JSON to handle data having a more complex structure. 
//you have to install the body-parser package. 
//This package allows you to use a series of middleware, which can decode data in different formats.
//middleware un before any other routes run
//path is nto define because it contain all the path
//middleware required next
app.use(bodyParser.urlencoded({extended: false}));  

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
//dirname = the inital url of our website or the root path
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

//Get Route Parameter Input from the Client
//When building an API, we have to allow users to communicate to us what they want to get from our service. 
//if the client is requesting information about a user stored in the database, 
//they need a way to let us know which user they're interested in
//Route parameters are named segments of the URL, delimited by slashes (/)
//this is not a middleware
//passing  the parameters to the api and converting them to message echo
app.get("/:word/echo", (req, res) => {
   console.log(req.params);
   res.json({echo: req.params.word}) 
});

//Another common way to get input from the client is by 
//encoding the data after the route path, using a query string.
 app.get("/name", (req, res) => {
    console.log(req.query);
    res.json({
        name: req.query.first + " " + req.query.last
    });
 });






























 module.exports = app;
