const path = require('path');

module.exports = (app) => {
  app.get('/update-stats', (req, res) => {
    res.send('Updating stats...');
    return require(path.resolve('./', 'services', 'updateStats'))();
  });

  app.get('/update-play-stats', (req, res) => {
    res.send('Updating play stats...');
    return require(path.resolve('./', 'services', 'updatePlayStats'))();
  });
};
