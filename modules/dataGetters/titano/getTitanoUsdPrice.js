const getTitanoBnbPrice = require('../titano/getTitanoBnbPrice');

module.exports = async (bnbUsdPrice) => {
  const titanoBnbPrice = await getTitanoBnbPrice();
  return bnbUsdPrice * titanoBnbPrice;
};
