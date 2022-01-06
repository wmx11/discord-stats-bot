const { allowedChannels } = require('../config');

const printAllowedChannels = allowedChannels.map(channel => `<#${channel}> `);
const notAllowedInThisChannelMessage = `Bzzzzt. Please use me on ${printAllowedChannels} channel.`;

const deleteMessageTimeout = 2500;

module.exports = async (message) => {
  const { channel } = message;

  const botMessage = await channel.send(notAllowedInThisChannelMessage);

  setTimeout(() => {
    botMessage.delete();
    message.delete();
  }, deleteMessageTimeout);
};
