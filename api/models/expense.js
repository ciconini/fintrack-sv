const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  type: String,
  value: Number,
  date: String
});

module.exports = mongoose.model('Expense', expenseSchema);