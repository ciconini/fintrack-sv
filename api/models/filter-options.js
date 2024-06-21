const mongoose = require('mongoose');

const filterOptionsSchema = mongoose.Schema({
  order: {type: String, required: true},
  orderBy: {type: String, required: true},
  query: String,
  dateStart: {type: Date, required: true},
  dateEnd: {type: Date, required: true},
  type: String,
  limit: {type: Number, required: true},
  page: {type: Number, required: true},
});

module.exports = mongoose.model('FilterOptions', filterOptionsSchema);