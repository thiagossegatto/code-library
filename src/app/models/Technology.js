const mongoose = require('../../database');

const TechSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    require: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Technology = mongoose.model('Technology', TechSchema);

module.exports = Technology;