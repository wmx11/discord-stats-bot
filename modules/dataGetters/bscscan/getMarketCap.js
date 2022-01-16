const bscApiClient = require('./bscApiClient');

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

  return (
    (parseInt(result, 10) / decimalPlaces) *
    circulatingSupply *
    currentPrice
  );
};
