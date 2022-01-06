const { MessageAttachment } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { brandColor } = require('../../config');

module.exports = async ({ labels, datas, datasetLabel, filename }) => {
  const canvas = new ChartJSNodeCanvas({
    width: 900,
    height: 400,
    backgroundColour: '#fff',
  });

  const image = await canvas.renderToBuffer({
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: datasetLabel,
          data: datas,
          color: brandColor,
          borderColor: brandColor,
        },
      ],
    },
  });

  return new MessageAttachment(image, `${filename}.png`);
};
