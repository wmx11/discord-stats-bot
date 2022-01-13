require('dotenv').config();

const { Client, Intents } = require('discord.js');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');
const setNickname = require('../utils/setNickname');

const getHolders = require('../modules/statsGetters/getHolders');

const { bots } = require('../config');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log('Holders Watch Bot Ready');

  client.user.setPresence({
    activities: [{ name: 'Holders', type: 'WATCHING' }],
    status: 'online',
  });

  const holders = await getHolders();
  setNickname(client, bots.holders, holders);

  eventBus.on(stats.update, async () => {
    const holders = await getHolders();
    setNickname(client, bots.holders, holders);
  });
});

client.login(process.env.DISCORD_TOKEN_HOLDERS);
