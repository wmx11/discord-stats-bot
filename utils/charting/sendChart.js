const { MessageEmbed } = require('discord.js');
const { brandColor } = require('../../config');

module.exports = async (interaction, { title, filename, attachment, content }) => {
  const chartEmbed = new MessageEmbed({
    title,
    color: brandColor,
  });

  chartEmbed.setImage(`attachment://${filename}.png`);

  await interaction.update({ content, components: [], embeds: [chartEmbed], files: [attachment] });
};
