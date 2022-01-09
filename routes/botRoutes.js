module.exports = (app) => (client) => {
  app.get('/bot-hype/:channelId/:message', (req, res) => {
    res.send('Hyped!');
    if (req.params.channelId && req.params.message) {
      try {
        return client.channels.cache.get(req.params.channelId).send(decodeURI(req.params.message));
      } catch (error) {
        console.log(error);
      }
    }
  });
};
