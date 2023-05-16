const mongoose = require('mongoose');
// Bluebird is library and the strongest feature of javaScript.
// It alows you to "promisify" other node module in
// order to use them asynchronously. 
mongoose.Promise === require('bluebird')

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;