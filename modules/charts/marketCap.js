const getStats = require('../../utils/data/getStats');
const createChart = require('../../utils/charting/createChart');
const getDataset = require('../../utils/charting/getDataset');
const sendChart = require('../../utils/charting/sendChart');

module.exports = async (interaction) => {
  const marketcap = await getStats('marketCap date', { limit: 100, sort: { date: -1 } });
  const dataset = getDataset(marketcap.reverse(), 'marketCap');

  const attachment = await createChart({
    ...dataset,
    datasetLabel: 'Market Cap',
    filename: 'marketcap',
  });

  return await sendChart(interaction, {
    title: '$TITANO Market Cap ($USD)',
    content: 'Market Cap Chart',
    filename: 'marketcap',
    attachment,
  });
};
