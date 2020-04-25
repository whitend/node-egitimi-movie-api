const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://whitend:060312mlab@dbh11.mlab.com:27117/heroku_75908hd4', {useNewUrlParser: true,useUnifiedTopology: true });
  mongoose.connection.on('open', () => {
    console.log('MongoDB: connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: connection failed : ',err);
  });

  mongoose.Promise = global.Promise;
};