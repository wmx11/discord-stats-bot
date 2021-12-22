const getHolders = require('../modules/scrapers/bscscan/getHolders');

module.exports = async (message) => {
  const { channel } = message;
  const holders = await getHolders();
  const holdersMessage = `Titano currently has **${parseInt(holders, 10).toLocaleString('en-US')}** holders`;
  return channel.send(holdersMessage);
};
