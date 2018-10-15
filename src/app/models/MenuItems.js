const mongoose = require('../../database');

const MenuItemsSchema = new mongoose.Schema({
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
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItems = mongoose.model('MenuItems', MenuItemsSchema);

module.exports = MenuItems;