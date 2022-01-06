const mongoose = require('mongoose');
const Stats = mongoose.model('stats');

module.exports = async (select, options = { limit: 100 }) => {
  return await Stats.find({}, select, options).exec();
};
