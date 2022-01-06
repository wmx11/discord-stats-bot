const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = async (interaction) => {
  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId('charts')
      .setPlaceholder('Select Chart')
      .addOptions([
        {
          label: 'Market Cap',
          description: 'Shows the Market cap chart',
          value: 'marketCap',
        },
        {
          label: 'Treasury',
          description: 'Shows the Treasury chart',
          value: 'treasury',
        },
        {
          label: 'RFV',
          description: 'Shows the RFV chart',
          value: 'rfv',
        },
        {
          label: 'Price',
          description: 'Shows the Price chart',
          value: 'price',
        },
        {
          label: 'Holders',
          description: 'Shows the Holders chart',
          value: 'holders',
        },
      ])
  );
  await interaction.reply({ content: 'Select a chart', components: [row] });
};
