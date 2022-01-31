const BscScan = require('./BscScan');
const { treasuryAddress, decimalPlaces } = require('../../../config');

const bscScan = new BscScan(process.env.BSC_API_KEY);

module.exports = async (bnbPrice) => {
  const {
    data: { result },
  } = await bscScan.getBnbBalanceSingleAddress(treasuryAddress);

  return (result / decimalPlaces) * bnbPrice;
};
