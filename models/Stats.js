const mongoose = require('mongoose');
const { Schema } = mongoose;

const statsSchema = new Schema({
  marketCap: Number,
  rfv: Number,
  treasury: Number,
  price: Number,
  holders: Number,
  date: Date,
});

mongoose.model('stats', statsSchema);
  
