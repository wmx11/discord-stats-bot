require('dotenv').config();
const { Client, Intents } = require('discord.js');
const runCommands = require('./utils/runCommands');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
  console.log('bot ready');
  client.user.setPresence({
    activities: [{ name: 'Titano Stats', type: 'WATCHING' }],
    status: 'online',
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }
  runCommands(message);
});

client.login(process.env.DISCORD_TOKEN);
