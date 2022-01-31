const mongoose = require('mongoose');
const { Schema } = mongoose;

const statsSchema = new Schema({
  marketCap: Number, //In USD
  rfv: Number, //In USD
  treasury: Number, //In USD
  price: Number, //In USD
  holders: Number,
  date: Date,
});

mongoose.model('stats', statsSchema);
  
