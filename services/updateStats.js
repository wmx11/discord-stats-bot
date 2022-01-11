const CoinGecko = require('coingecko-api');
const { format } = require('date-fns');

const mongoose = require('mongoose');
const Stats = mongoose.model('stats');

const axios = require('axios');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');

const getHolders = require('../modules/dataGetters/bscscan/getHolders');
const getMarketCap = require('../modules/dataGetters/bscscan/getMarketCap');
const getRfvBalance = require('../modules/dataGetters/bscscan/getRfvBalance');
const getTreasuryBalance = require('../modules/dataGetters/bscscan/getTreasuryBalance');

/**
 * @desc - Init the coinGecko client
 */
const CoinGeckoClient = new CoinGecko();

let isMessageSent = false;

module.exports = async () => {
  try {
    /**
     * @desc - Titano coin
     */
    const {
      data: { market_data: titano },
    } = await CoinGeckoClient.coins.fetch('titano', {});

    /**
     * @desc - BNB coin
     */
    const {
      data: { market_data: bnb },
    } = await CoinGeckoClient.coins.fetch('binancecoin', {});

    const holders = await getHolders();
    const marketCap = await getMarketCap(titano.current_price.usd);
    const treasuryBalance = await getTreasuryBalance(bnb.current_price.usd);
    const rvfBalance = await getRfvBalance(bnb.current_price.usd);

    await new Stats({
      marketCap: marketCap,
      rfv: rvfBalance,
      treasury: treasuryBalance,
      price: titano.current_price.usd,
      holders: holders,
      date: Date.now(),
    }).save();

    eventBus.emit(stats.update);

    console.log(`${format(Date.now(), 'yyy-MM-dd HH:mm:ss')} - Stats Updated`);

    if (!isMessageSent && parseInt(holders, 10) >= 24000) {
      await axios('https://service-7957.something.gg/bot-hype/908073303732813880/TITANO%20has%20just%20reached%2023k%20holders%21');
      isMessageSent = true;
    }
    
  } catch (error) {
    console.log(error);
  }
};
