const { allowedChannels } = require('../config');

module.exports = ({ channelId }) => {
  if (!channelId) {
    return;
  }

  return allowedChannels.includes(channelId);
};
