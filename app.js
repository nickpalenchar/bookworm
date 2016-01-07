var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var chalk = require('chalk');
var app = express();

var PORT = 3000;
var HOMEPAGE = 'index';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extend: true }));

app.use('/public', express.static('public'));
app.use('/angular', express.static('browser/js'))
app.set('views', path.join(__dirname, './browser'));

app.use(require('./server/routes'));
app.use(require('./server/auth'));
app.use('/users', require('./server/users'));

app.listen(PORT, function(){
    console.log("server is listening on port " + PORT);
});