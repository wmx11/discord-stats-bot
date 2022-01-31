require('dotenv').config();

const BitQuery = require('../bitQuery/BitQuery');

const query = `
query ($network: EthereumNetwork!, $hash: String!, $limit: Int!, $offset: Int!) {
  ethereum(network: $network) {
    transfers(
      options: {limit: $limit, offset: $offset}
      amount: {gt: 0}
      txHash: {is: $hash}
    ) {
      sender {
        address
        annotation
      }
      receiver {
        address
        annotation
      }
      amount
      currency {
        symbol
        address
      }
      external
      success
    }
  }
}`;

module.exports = async (txHash) => {
  const bitQuery = new BitQuery(process.env.BITQUERY_API_KEY);

  const variables = {
    limit: 100,
    offset: 0,
    network: 'bsc',
    hash: txHash,
  };

  const request = await bitQuery.get(query, variables);
  const {
    data: {
      data: { ethereum },
    },
  } = request;

  const drawDetails = ethereum.transfers;
  return drawDetails;
};
