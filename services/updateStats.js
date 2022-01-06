const CoinGecko = require('coingecko-api');

const mongoose = require('mongoose');
const Stats = mongoose.model('stats');

const getHolders = require('../modules/dataGetters/bscscan/getHolders');
const getMarketCap = require('../modules/dataGetters/bscscan/getMarketCap');
const getRfvBalance = require('../modules/dataGetters/bscscan/getRfvBalance');
const getTreasuryBalance = require('../modules/dataGetters/bscscan/getTreasuryBalance');

/**
 * @desc - Init the coinGecko client
 */
const CoinGeckoClient = new CoinGecko();

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
    
  } catch (error) {
    console.log(error);
  }
};
