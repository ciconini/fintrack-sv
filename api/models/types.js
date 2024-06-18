const mongoose = require('mongoose');

const typesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  label: String,
  icon: String
});

module.exports = mongoose.model('Type', typesSchema);