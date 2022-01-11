require('dotenv').config();

const { Client, Intents } = require('discord.js');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');
const setNickname = require('../utils/setNickname');

const getTreasury = require('../modules/statsGetters/getTreasury');

const { bots } = require('../config');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log('Treasury Watch Bot Ready');

  client.user.setPresence({
    activities: [{ name: 'Treasury', type: 'WATCHING' }],
    status: 'online',
  });

  const treasury = await getTreasury();
  setNickname(client, bots.treasury, treasury);

  eventBus.on(stats.update, async () => {
    const treasury = await getTreasury();
    setNickname(client, bots.treasury, treasury);
  });
});

client.login(process.env.DISCORD_TOKEN_TREASURY);
