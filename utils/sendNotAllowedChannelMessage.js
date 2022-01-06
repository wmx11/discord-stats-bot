const { allowedChannels } = require('../config');

const notAllowedInThisChannelMessage = `Bzzzzt. Please use me on <#${allowedChannels}> channel.`;

const deleteMessageTimeout = 2500;

module.exports = async (message) => {
  const { channel } = message;

  const botMessage = await channel.send(notAllowedInThisChannelMessage);

  setTimeout(() => {
    botMessage.delete();
    message.delete();
  }, deleteMessageTimeout);
};
