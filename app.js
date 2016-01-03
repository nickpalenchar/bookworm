var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var PORT = 3000;
var HOMEPAGE = 'index';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extend: true }));

app.use(express.static('/public'));
app.set('views', path.join(__dirname, './browser'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './browser/index.html'));
});

// handle any errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({ error: err });
    res.send("An error occured.");
});

app.listen(PORT, function(){
    console.log("server is listening on port " + PORT);
});