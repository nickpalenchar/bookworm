var auth = require('express').Router();
var chalk = require('chalk');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../db/models').User;

passport.use(new GoogleStrategy({
    clientID: '239257848228-tt8jvan4avuqbak4skdlom3vctbuia50.apps.googleusercontent.com',
    clientSecret: 'EUMjSVq80FIGDZbXawLjFgCb',
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
    },
    function(token, refreshToken, profile, done){
        console.log(chalk.blue.bold("Hello from token authentication!"));
        console.log("Token ", token,
                    "refreshToken ", refreshToken,
                    "profile", profile);
        console.log(chalk.yellow(profile.emails[0].value));
        //CONFIRM USER
        User.findOne( { 'google.email' : profile.emails[0].value }).then(function(user){
            console.log(chalk.green.bold("User found!"));
            return done(null, user)
        }).
        then(null, function(error){
            console.log(chalk.red.bold("User not found!"))
            return done(error)
        });

    })
);

auth.get('/auth/google', passport.authenticate('google', { scope: 'email'} ));

auth.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/yay',
        failureRedirect: '/login'
    })
);

auth.use(session({ secret: 'readingissexy'}));
auth.use(function(req, res, next){
    console.log(req.session);
    next();
});
auth.use(passport.initialize());
auth.use(passport.session());


module.exports = auth;