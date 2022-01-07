const getStats = require('../../utils/data/getStats');
const createChart = require('../../utils/charting/createChart');
const getDataset = require('../../utils/charting/getDataset');
const sendChart = require('../../utils/charting/sendChart');

module.exports = async (interaction) => {
  const treasury = await getStats('treasury date', { limit: 100, sort: { date: -1 } });
  const dataset = getDataset(treasury.reverse(), 'treasury');

  const attachment = await createChart({
    ...dataset,
    datasetLabel: 'Treasury Balance',
    filename: 'treasury',
  });

  return await sendChart(interaction, {
    title: '$TITANO Treasury Balance ($USD)',
    content: 'Treasury Balance Chart',
    filename: 'treasury',
    attachment,
  });
};
