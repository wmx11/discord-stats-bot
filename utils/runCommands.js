const path = require('path');

const isInAllowedChannel = require('./isInAllowedChannel');
const sendNotAllowedChannelMessage = require('./sendNotAllowedChannelMessage');

const scanForQuestions = require('./questions/scanForQuestions');
const Lambo = require('../modules/lambo/Lambo');
const ChatWithBot = require('../modules/chatBots/ChatWithBot');

const {
  commandPrefix,
  commands,
  blacklist,
  botCommands,
} = require('../config');

const lamboBot = new Lambo();
const chatWithBot = new ChatWithBot(30);

module.exports = (message) => {
  const { content, author } = message;

  const isUserBlacklistedForCommands = blacklist.commands.includes(author.id);

  if (!content.startsWith(commandPrefix)) {
    lamboBot.reactAndReplyToMessage(message);
    chatWithBot.watch(message);
    return scanForQuestions(message);
  }

  const command = commands.find(
    (command) =>
      content
        .split(commandPrefix)
        .map((item) => (item ? item.toLowerCase() : ''))[1]
        .split(' ')[0] === command.name
  );

  const hasForeignBotCommands = botCommands.includes(content.toLowerCase());

  if (hasForeignBotCommands && !isInAllowedChannel(message)) {
    message.delete();
    return;
  }

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
