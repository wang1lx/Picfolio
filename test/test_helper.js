const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const User = require('../models/user');

mongoose.connect('mongodb://localhost/picfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', err => {
    console.error(err.message);
  });

beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
