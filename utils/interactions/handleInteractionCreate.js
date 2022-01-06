const path = require('path');

module.exports = (interaction) => {
  const { commandName } = interaction;

  if (!commandName) {
    return;
  }

  try {
    return require(path.resolve('./', 'slashCommands', commandName))(interaction);
  } catch (error) {
    console.log(error);
  }
};
