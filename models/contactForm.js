const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 6
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 2
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var contactForm = mongoose.model('contactForm', contactSchema);

module.exports = {
  contactForm
}
