const axios = require('axios');
const { contractAddress } = require('../../../config');

module.exports = async () => {
  const { data } = await axios.get(
    `https://bscscan.com/renderDynamicTooltip.ashx?term=getsuppyburnt~${contractAddress}`
  );

  if (!data) {
    return 0;
  }

  return data.reduce((initialAmount, item) => {
    const amountBurned = parseInt(item.split('\t').pop(), 10);

    if (!amountBurned) {
      return 0;
    }

    return initialAmount + amountBurned;
  }, 0);
};
