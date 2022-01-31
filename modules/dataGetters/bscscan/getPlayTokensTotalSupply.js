const BscScan = require('./BscScan');

const { playAddress, decimalPlaces } = require('../../../config');

const bscScan = new BscScan(process.env.BSC_API_KEY);

module.exports = async () => {
  const {
    data: { result },
  } = await bscScan.getTokenTotalSupplyByContractAddress(playAddress);

  return parseInt(result, 10) / decimalPlaces;
};
