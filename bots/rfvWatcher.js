require('dotenv').config();

const { Client, Intents } = require('discord.js');

const eventBus = require('../utils/events/eventBus');
const { stats } = require('../utils/events/events');
const setNickname = require('../utils/setNickname');

const getRfv = require('../modules/statsGetters/getRfv');

const { bots } = require('../config');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log('RFV Watch Bot Ready');

  client.user.setPresence({
    activities: [{ name: 'RFV', type: 'WATCHING' }],
    status: 'online',
  });

  const rfv = await getRfv();
  setNickname(client, bots.rfv, rfv);

  eventBus.on(stats.update, async () => {
    const rfv = await getRfv();
    setNickname(client, bots.rfv, rfv);
  });
});

client.login(process.env.DISCORD_TOKEN_RFV);
