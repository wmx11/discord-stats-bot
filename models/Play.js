const mongoose = require('mongoose');
const { Schema } = mongoose;

const playSchema = new Schema({
  totalSupply: Number, //In TITANO
  players: Number,
  lastTxHash: String,
  lastPlayPrize: Number, //In TITANO
  winningWallets: Array,
  lastDraw: Date,
  nextDraw: Date,
  date: Date,
});

mongoose.model('plays', playSchema);
