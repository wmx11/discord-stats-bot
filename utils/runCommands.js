const path = require('path');

const isInAllowedChannel = require('./isInAllowedChannel');
const sendNotAllowedChannelMessage = require('./sendNotAllowedChannelMessage');

const scanForQuestions = require('./questions/scanForQuestions');

const { commandPrefix, commands, blacklist } = require('../config');

module.exports = (message) => {
  const { content, author } = message;

  const isUserBlacklistedForCommands = blacklist.commands.includes(author.id);

  if (!content.startsWith(commandPrefix)) {
    if (content.includes('lambo')) {
      message.react('🇳');
      message.react('🇴');
    }
    return scanForQuestions(message);
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
    if (!isInAllowedChannel(message)) {
      sendNotAllowedChannelMessage(message);
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
