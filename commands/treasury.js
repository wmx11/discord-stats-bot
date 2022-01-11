const getTreasury = require('../modules/statsGetters/getTreasury');

module.exports = async (message) => {
  const { channel } = message;
  const treasury = await getTreasury();
  return channel.send(`**TITANO Treasury Balance**: ${treasury}`);
};
