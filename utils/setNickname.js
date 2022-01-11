const { guildId } = require('../config');

module.exports = (client, botId, nickname) =>
  client.guilds.cache
    .get(guildId)
    .members.cache.get(botId)
    .setNickname(nickname);
