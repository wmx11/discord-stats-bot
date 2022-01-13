const getStats = require('../../utils/data/getStats');
const moneyFormat = require('../../utils/moneyFormat');

module.exports = async () => {
  const [stats] = await getStats(null, {
    limit: 1,
    sort: {
      date: -1,
    },
  });

  const { price } = stats;

  return moneyFormat(price, 6);
};
