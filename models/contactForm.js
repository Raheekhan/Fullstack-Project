const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

var contactForm = mongoose.model('contactForm', contactSchema);

module.exports = {
  contactForm
}
