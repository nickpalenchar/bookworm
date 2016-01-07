var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/index.html'));
});

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/portal.html'))
});

router.get('/yay', function(req, res){
    res.sendFile(path.join(__dirname, '../browser/sucesss.html'));
});

// handle any errors
router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({ error: err });
    res.send("An error occured.");
});

module.exports = router;