const bscApiClient = require('./bscApiClient');
const { rfvAddress, decimalPlaces } = require('../../../config');

module.exports = async (bnbPrice) => {
  const {
    data: { result },
  } = await bscApiClient({
    module: 'account',
    action: 'balance',
    contractaddress: rfvAddress,
  });

  return (result / decimalPlaces) * bnbPrice;
};
