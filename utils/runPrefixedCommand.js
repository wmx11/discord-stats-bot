const path = require('path');
const { commandPrefix, commands } = require('../config');

module.exports = (message) => {
  const { content } = message;

  if (!content.startsWith(commandPrefix)) {
    return;
  }

  const command = commands.find(
    (command) =>
      content
        .split(commandPrefix)
        .map((item) => (item ? item.toLowerCase() : ''))[1].split(' ')[0] === command
  );

  if (!command) {
    return;
  }

  try {
    return require(path.resolve('./', 'commands', `${command}`))(message);
  } catch (error) {
    console.log(error);
  }
};
