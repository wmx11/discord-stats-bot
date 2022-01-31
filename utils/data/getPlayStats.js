const mongoose = require('mongoose');
const Play = mongoose.model('plays');

module.exports = async (select, options = { limit: 100 }) => {
  return await Play.find({}, select, options).exec();
};
