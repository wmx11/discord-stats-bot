require('dotenv').config();

const { Client, Intents } = require('discord.js');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');
const setNickname = require('../utils/setNickname');

const getMarketcap = require('../modules/statsGetters/getMarketcap');

const { bots } = require('../config');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log('Marketcap Watch Bot Ready');

  client.user.setPresence({
    activities: [{ name: 'Marketcap', type: 'WATCHING' }],
    status: 'online',
  });

  const marketcap = await getMarketcap();
  setNickname(client, bots.marketcap, marketcap);

  eventBus.on(stats.update, async () => {
    const marketcap = await getMarketcap();
    setNickname(client, bots.marketcap, marketcap);
  });
});

client.login(process.env.DISCORD_TOKEN_MARKETCAP);
