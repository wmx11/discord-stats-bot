const BscScan = require('./BscScan');

const {
  contractAddress,
  circulatingSupply,
  decimalPlaces,
} = require('../../../config');

const bscScan = new BscScan(process.env.BSC_API_KEY);

module.exports = async (currentPrice) => {
  const {
    data: { result },
  } = await bscScan.getTokenTotalSupplyByContractAddress(contractAddress);

  return (
    (parseInt(result, 10) / decimalPlaces) * circulatingSupply * currentPrice
  );
};
