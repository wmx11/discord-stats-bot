require('dotenv').config();

const BitQuery = require('../bitQuery/BitQuery');

const query = `
query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    transfers(
      currency: {is: $token}
      amount: {gt: 0}
      date: {since: $from, till: $till}
    ) {
      currency {
        symbol
      }
      median: amount(calculate: median)
      average: amount(calculate: average)
      amount
      count
      days: count(uniq: dates)
      sender_count: count(uniq: senders)
      receiver_count: count(uniq: receivers)
      min_date: minimum(of: date)
      max_date: maximum(of: date)
    }
  }
}`;

const variables = {
  limit: 10,
  offset: 0,
  network: 'bsc',
  token: '0x3ac632f97f389290c61289ecc03564c2a4c20882',
};

module.exports = async () => {
  const bitQuery = new BitQuery(process.env.BITQUERY_API_KEY);
  const request = await bitQuery.get(query, variables);
  const {
    data: {
      data: { ethereum },
    },
  } = request;
  const playPlayers = ethereum.transfers[0].receiver_count;
  return playPlayers;
};
