const path = require('path');

module.exports = async (interaction) => {
  const { customId, values } = interaction;

  if (!customId || !values.length) {
    return;
  }

  // First value is the chart type
  const chartType = values[0];

  try {
    return require(path.resolve('./', 'modules', 'charts', chartType))(
      interaction
    );
  } catch (error) {
    console.log(error);
  }
};
