const BscScan = require('./BscScan');
const { rfvAddress, decimalPlaces } = require('../../../config');

const bscScan = new BscScan(process.env.BSC_API_KEY);

module.exports = async (bnbPrice) => {
  const {
    data: { result },
  } = await bscScan.getBnbBalanceSingleAddress(rfvAddress);

  return (result / decimalPlaces) * bnbPrice;
};
