var mongoose = require('mongoose');
mongoose.set('debug', true);
var Q = require('q');
mongoose.Promise = Q.Promise;

var MONGOOSE_URI = 'mongodb://localhost/bookworm2';

mongoose.connect(MONGOOSE_URI);

var db = mongoose.connection;
db.on('open', function(){
    console.log("Database successfuly opened");
});
db.on('error', console.error.bind(console, "mongodb connection error"));

var Schema = mongoose.Schema;

var TestSchema = new Schema({
    testString: String
});

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    google: {
        id: String,
        token: String,
        name: String,
        email: {type: String, unique: true}
    },
    readingStatus: {
        currentBook: {type: String, default: null},
        pageNumber: {type: Number, default: 0}
    },
    isAdmin: {type: Boolean, default: false},
    confirmed: { type: Boolean, default: false }
});

var BookSchema = new Schema({
    title: String,
    author: String,
    edition: String,
    isbn: Number,
    pages: Number
});

var BookClubSchema = new Schema({
   //this will be when multiple book clubs exist.
    name: String,
    subUrl: String,
    admins: [String], //TODO change to UserSchema
});

module.exports = {
    Test: mongoose.model('Test', TestSchema),
    User : mongoose.model('User', UserSchema),
    Book : mongoose.model('Book', BookSchema)
}