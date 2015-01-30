var express = require('express');
var path = require('path');
var user = require('./user');
var bodyParser = require('body-parser');

var app = express();

//use body parser POST method requires this
app.use(bodyParser.json());

//this function is executed for every request
app.use(function(req,res,next){
    console.log("Olen serveri");
    console.log(req.method);
    console.log(req.path);
    next();
});

//Middleware for user data
app.use('/data',user);

//Use static files from public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/add',express.static(path.join(__dirname, 'public')));


app.listen(3000);