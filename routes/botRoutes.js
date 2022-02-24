const axios = require('axios');
const { botEndpoint, mainChannelId } = require('../config');

module.exports = (app) => (client) => {
  app.get('/bot-say/:channelId/:message', (req, res) => {
    res.send('Bot has spoken');
    if (req.params.channelId && req.params.message) {
      try {
        return client.channels.cache.get(req.params.channelId).send(decodeURI(req.params.message));
      } catch (error) {
        console.log(error);
      }
    }
  });

  app.post('/bot-post', (req, res) => {
    res.send('Bot has spoken in post');
    const { channelId, message } = req.body;
    if (channelId && message) {
      try {
        return client.channels.cache.get(channelId).send(decodeURI(message));
      } catch (error) {
        console.log(error);
      }
    }
  });

  app.get('/bot-scam-disclaimer', (req, res) => {
    const message = `
    **REMINDER**
    Titano has not and never will make a group chat to **"airdrop"**. 
    Any tokens sent to your wallet without request are a scam.
    Any DMs from ANYONE claiming to be a mod or support is fake.

    Titano does not have "Official airdrop" groups.
    Titano does not have "Official claim your rewards" groups.
    `;
  
    res.send('Disclaimer');

    axios({
      url: `${botEndpoint}/bot-post`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        channelId: mainChannelId,
        message,
      },
    })
  });

  app.get('/bot-offtopic-disclaimer', (req, res) => {
    const message = `
**World news have affected all markets including Titano.**
The Ukraine and Russia political conflict and special military operations have affected the global markets, including cryptocurrencies.
We understand your concerns and we want you to move political and geopolitical conflict talk to <#908073303942508664>
Thank you.
    `;
  
    res.send('Off topic disclaimer');

    axios({
      url: `${botEndpoint}/bot-post`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        channelId: mainChannelId,
        message,
      },
    })
  });
};
