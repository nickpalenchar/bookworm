var router = require('express').Router();
var chalk = require('chalk');
//var User = require('../db/models').User;
//var User = require('mongoose').model('User');
var User = require('../db/models').User;
var Test = require('../db/models').Test;

router.post('/test', function(req, res, next){
    var input = req.body;
    Test.create( input ).then(function(createdStr){
        res.redirect('/');
    }).then(null, next)
});

router.post('/add', function(req, res, next){
    console.log(chalk.dim("[server/users] "), "post route\n body is: ", req.body);
    var input = req.body;
    User.create(input).then(function(createdUser){
       res.redirect('/');
        //TODO: Where should we redirect after this?
       // console.log(chalk.italics.grey("[server/users.js] "), "user created.");
       // res.send("created" + createdUser);
       // next();
    }).then(null, function(error){
        console.log(chalk.italics.gray("[server/users.js] "), "there was an error:\n", error);
        res.send("error! " + error);
        next();
    });
    console.log(chalk.bold("afterPromise"));
});

module.exports = router;