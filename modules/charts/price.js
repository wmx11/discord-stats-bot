const getStats = require('../../utils/data/getStats');
const createChart = require('../../utils/charting/createChart');
const getDataset = require('../../utils/charting/getDataset');
const sendChart = require('../../utils/charting/sendChart');

module.exports = async (interaction) => {
  const price = await getStats('price date');
  const dataset = getDataset(price, 'price');

  const attachment = await createChart({
    ...dataset,
    datasetLabel: 'Price',
    filename: 'price',
  });

  return await sendChart(interaction, {
    title: '$TITANO Price ($USD)',
    content: 'Price Chart',
    filename: 'price',
    attachment,
  });
};
