require('dotenv').config();

const { intervalToDuration } = require('date-fns');
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

  const getTimeToAma = () => {
    const date = intervalToDuration({
      start: new Date(),
      end: new Date('2022-01-21 15:00:00'),
    });
    return date;
  };

  const getHasAmaStarted = () => {
    return getTimeToAma().hours === 0 && getTimeToAma().minutes === 0;
  }

  const getActivityName = () => !getHasAmaStarted() ? 'Time to AMA' : 'Treasury';

  const getNickname = (nickname) => {
    if (getHasAmaStarted()) {
      return nickname;
    }
    const { hours, minutes } = getTimeToAma();
    return `${hours}h ${minutes}m to AMA`;
  }

  client.user.setPresence({
    activities: [{ name: getActivityName(), type: 'WATCHING' }],
    status: 'online',
  });

  const treasury = await getTreasury();
  setNickname(client, bots.treasury, getNickname(treasury));

  eventBus.on(stats.update, async () => {
    const treasury = await getTreasury();
    setNickname(client, bots.treasury, getNickname(treasury));
  });
});

client.login(process.env.DISCORD_TOKEN_TREASURY);
