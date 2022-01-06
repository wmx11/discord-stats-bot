const path = require('path');

module.exports = (interaction) => {
  const { customId } = interaction;

  if (!customId) {
    return;
  }

  try {
    return require(path.resolve('./', 'interactionMenus', customId))(interaction);
  } catch (error) {
    console.log(error);
  }
};
