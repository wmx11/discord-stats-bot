const { guildId } = require('../config');

module.exports = (client, botId, nickname) => {
  client.guilds.cache.forEach((guild) => {
    const { id } = guild;

    client.guilds.cache
    .get(id)
    .members.cache.get(botId)
    .setNickname(nickname);
  });
};
