const { commands, commandPrefix } = require('../config');

module.exports = (message) => {
  const { channel } = message;

  const availableCommands = commands.map(({name, description}) => {
    return `**\`${commandPrefix}${name}\`** - \`${description}\``;
  }).join('\n');

  return channel.send(`List of available commands:\n${availableCommands}`);
};
