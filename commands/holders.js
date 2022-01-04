const getHolders = require('../modules/scrapers/bscscan/getHolders');
const cacheState = require('../utils/cacheState');
const setCacheState = require('../utils/setCacheState');

const state = cacheState();

module.exports = async (message) => {
  const { channel } = message;
  const fetchingMessage = await channel.send('Fetching holders...');

  try {
    if (state.isFetched) {
      fetchingMessage.delete();
      return channel.send(state.cachedData);
    }

    const holders = await getHolders();
    const holdersMessage = `Titano currently has **${parseInt(
      holders,
      10
    ).toLocaleString('en-US')}** holders`;

    fetchingMessage.delete();
    setCacheState(state, holdersMessage);
    return channel.send(holdersMessage);
  } catch (error) {
    return channel.send("Bzzzzt. Couldn't fetch holders :( Try again a little later.");
  }
};
