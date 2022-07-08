const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tick = new Schema({
  node: {
    type: String,
  },
  equipe: {
    type: String,
  },
  responsable: {
    type: String,
  },
  test: {
    type: String,
  },
});

module.exports = mongoose.model('ticks', tick);
