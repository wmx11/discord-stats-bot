const { Client, Intents } = require('discord.js');
const runPrefixedCommand = require('./utils/runPrefixedCommand');
require('dotenv').config();

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
  runPrefixedCommand(message);
});

client.login(process.env.DISCORD_TOKEN);
