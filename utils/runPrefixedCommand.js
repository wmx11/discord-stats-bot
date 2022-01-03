const path = require('path');
const { commandPrefix, commands, allowedChannels, blacklist } = require('../config');

module.exports = (message) => {
  const { content, channel, channelId, author } = message;

  const isInAllowedChannel = allowedChannels.includes(channelId);
  const isUserBlacklistedForCommands = blacklist.commands.includes(author.id);

  const notAllowedInThisChannelMessage = `Bzzzzt. Please use me on <#${allowedChannels}> channel.`;

  const deleteMessageTimeout = 2500;

  if (!content.startsWith(commandPrefix)) {
    return;
  }

  const command = commands.find(
    (command) =>
      content
        .split(commandPrefix)
        .map((item) => (item ? item.toLowerCase() : ''))[1]
        .split(' ')[0] === command.name
  );

  if (!command) {
    return;
  }

  try {
    if (!isInAllowedChannel) {
      channel.send(notAllowedInThisChannelMessage).then((sentMessage) => {
        setTimeout(() => {
          sentMessage.delete();
          message.delete();
        }, deleteMessageTimeout);
      });
      return null;
    }

    if (isUserBlacklistedForCommands) {
      message.delete();
      return null;
    }

    return require(path.resolve('./', 'commands', `${command.name}`))(message);
  } catch (error) {
    console.log(error);
  }
};
