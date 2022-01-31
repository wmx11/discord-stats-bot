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

  app.post('/bot-say', (req, res) => {
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
};
