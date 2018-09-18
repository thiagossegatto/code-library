const mongoose = require('mongoose');

mongoose.connect('mongodb://library:library123@ds155862.mlab.com:55862/library', { useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;