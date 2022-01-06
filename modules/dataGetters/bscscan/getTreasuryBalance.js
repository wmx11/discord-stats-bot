const bscApiClient = require('./bscApiClient');
const { treasuryAddress, decimalPlaces } = require('../../../config');

module.exports = async (bnbPrice) => {
  const {
    data: { result },
  } = await bscApiClient({
    module: 'account',
    action: 'balance',
    contractaddress: treasuryAddress,
  });

  return (result / decimalPlaces) * bnbPrice;
};
