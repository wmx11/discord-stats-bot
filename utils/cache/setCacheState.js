const { dataFetchCacheTimeout } = require('../../config');

module.exports = (state, dataToCache) => {
  if (!state) {
    return;
  }

  state.isFetched = true;
  state.cachedData = dataToCache;

  setTimeout(() => {
    state.isFetched = false;
    state.cachedData = null;
  }, dataFetchCacheTimeout);
};
