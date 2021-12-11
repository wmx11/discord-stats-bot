const bscApiClient = require('./bscApiClient');
const getBurntAmount = require('./getBurntAmount');
const {
  contractAddress,
  circulatingSupply,
  decimalPlaces,
} = require('../../../config');

module.exports = async (currentPrice) => {
  const {
    data: { result },
  } = await bscApiClient({
    module: 'stats',
    action: 'tokensupply',
    contractaddress: contractAddress,
  });

  const burntAmount = await getBurntAmount();

  return (
    (parseInt(result, 10) / decimalPlaces - burntAmount) *
    circulatingSupply *
    currentPrice
  );
};
