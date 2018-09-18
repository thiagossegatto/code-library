const mongoose = require('../../database');

const ItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: false
  },
  code: {
    type: String,
    require: false
  },
  technology: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technology'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Items = mongoose.model('Items', ItemsSchema);

module.exports = Items;