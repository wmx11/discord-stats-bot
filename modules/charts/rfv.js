const getStats = require('../../utils/data/getStats');
const createChart = require('../../utils/charting/createChart');
const getDataset = require('../../utils/charting/getDataset');
const sendChart = require('../../utils/charting/sendChart');

module.exports = async (interaction) => {
  const rfv = await getStats('rfv date');
  const dataset = getDataset(rfv, 'rfv');

  const attachment = await createChart({
    ...dataset,
    datasetLabel: 'RFV',
    filename: 'rfv',
  });

  return await sendChart(interaction, {
    title: '$TITANO RFV Balance ($USD)',
    content: 'RFV Balance Chart',
    filename: 'rfv',
    attachment,
  });
};
