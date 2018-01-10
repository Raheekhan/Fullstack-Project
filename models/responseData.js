const mongoose = require('mongoose');

var responseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

var responseData = mongoose.model('responseData', responseSchema);

module.exports = {
  responseData
}
