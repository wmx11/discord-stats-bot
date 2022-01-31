const getStats = require('../../utils/data/getPlayStats');

module.exports = async () => {
  const [stats] = await getStats(null, {
    limit: 1,
    sort: {
      date: -1,
    },
  });

  const { totalSupply } = stats;

  return totalSupply.toLocaleString('en-US');
};
