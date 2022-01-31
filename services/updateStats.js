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

const getBnbUsdtPrice = require('../modules/dataGetters/bnb/getBnbUsdtPrice');
const getTitanoUsdPrice = require('../modules/dataGetters/titano/getTitanoUsdPrice');

const { mainChannelId, botEndpoint } = require('../config');

const milestones = {
  nextMilestone: 0,
  isSet: false,
};

module.exports = async () => {
  try {
    const holders = await getHolders();
    const bnbUsdtPrice = await getBnbUsdtPrice();
    const titanoUsdPrice = await getTitanoUsdPrice(bnbUsdtPrice);
    const marketCap = await getMarketCap(titanoUsdPrice);
    const treasuryBalance = await getTreasuryBalance(bnbUsdtPrice);
    const rvfBalance = await getRfvBalance(bnbUsdtPrice);

    const getNextMilestone = () => Math.floor(holders / 1000) * 1000 + 1000;

    await new Stats({
      marketCap: marketCap,
      rfv: rvfBalance,
      treasury: treasuryBalance,
      price: titanoUsdPrice,
      holders: holders,
      date: Date.now(),
    }).save();

    if (!milestones.isSet) {
      milestones.nextMilestone = getNextMilestone();
      milestones.isSet = true;
    }

    eventBus.emit(stats.update);

    console.log(`${format(Date.now(), 'yyy-MM-dd HH:mm:ss')} - Stats Updated`);

    if (holders >= milestones.nextMilestone) {
      milestones.nextMilestone = getNextMilestone();
      const holdersAchievedMessage = encodeURI(`**TITANO has just reached ${Math.floor(holders / 1000)}k holders!** 🚀🚀🚀`);
      await axios(`${botEndpoint}/bot-say/${mainChannelId}/${holdersAchievedMessage}`)
    }

    await axios(`${botEndpoint}/update-play-stats`);
    
  } catch (error) {
    console.log(error);
  }
};
