const getStats = require('../../utils/data/getStats');
const createChart = require('../../utils/charting/createChart');
const getDataset = require('../../utils/charting/getDataset');
const sendChart = require('../../utils/charting/sendChart');

module.exports = async (interaction) => {
  const holders = await getStats('holders date', { limit: 100, sort: { date: -1 } });
  const dataset = getDataset(holders.reverse(), 'holders');

  const attachment = await createChart({
    ...dataset,
    datasetLabel: 'Holders',
    filename: 'holders',
  });

  return await sendChart(interaction, {
    title: '$TITANO Holders',
    content: 'Holders Chart',
    filename: 'holders',
    attachment,
  });
};
