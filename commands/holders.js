const getStats = require('../utils/data/getStats');

module.exports = async (message) => {
  const { channel } = message;
  const fetchingMessage = await channel.send('Fetching holders...');
  
  try {
    const [stats] = await getStats('holders', {
      limit: 1,
      sort: {
        date: -1,
      },
    });

    const { holders } = stats;

    const holdersMessage = `Titano currently has **${parseInt(
      holders,
      10
    ).toLocaleString('en-US')}** holders`;

    fetchingMessage.delete();
    return channel.send(holdersMessage);
  } catch (error) {
    return channel.send(
      "Bzzzzt. Couldn't fetch holders :( Try again a little later."
    );
  }
};
