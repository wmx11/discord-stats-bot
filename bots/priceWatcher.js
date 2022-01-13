require('dotenv').config();

const { Client, Intents } = require('discord.js');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');
const setNickname = require('../utils/setNickname');

const getPrice = require('../modules/statsGetters/getPrice');

const { bots } = require('../config');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log('Price Watch Bot Ready');

  client.user.setPresence({
    activities: [{ name: 'Price', type: 'WATCHING' }],
    status: 'online',
  });

  const price = await getPrice();
  setNickname(client, bots.price, price);

  eventBus.on(stats.update, async () => {
    const price = await getPrice();
    setNickname(client, bots.price, price);
  });
});

client.login(process.env.DISCORD_TOKEN_PRICE);
