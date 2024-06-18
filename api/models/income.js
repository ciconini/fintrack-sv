const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  value: Number,
  date: String
});

module.exports = mongoose.model('Income', incomeSchema);