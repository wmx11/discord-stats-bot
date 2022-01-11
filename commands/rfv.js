const getRfv = require('../modules/statsGetters/getRfv');

module.exports = async (message) => {
  const { channel } = message;
  const rfv = await getRfv();
  return channel.send(`**TITANO RFV Balance**: ${rfv}`);
};
