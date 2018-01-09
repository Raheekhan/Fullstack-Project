const mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String
});

var User = mongoose.model('User', nameSchema);

module.exports = {
  User
}
