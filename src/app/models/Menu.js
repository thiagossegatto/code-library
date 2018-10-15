const mongoose = require('../../database');

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    require: false
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItems'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;