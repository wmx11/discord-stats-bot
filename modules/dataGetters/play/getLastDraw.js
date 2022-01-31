require('dotenv').config();

const BitQuery = require('../bitQuery/BitQuery');

const query = `
query ($network: EthereumNetwork!, $limit: Int!, $offset: Int!, $contract: String!, $method: String!) {
  ethereum(network: $network) {
    smartContractCalls(
      options: {desc: "block.timestamp.time", limit: $limit, offset: $offset}
      smartContractAddress: {is: $contract}
      smartContractMethod: {is: $method}
    ) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
        height
      }
      address: caller {
        address
        annotation
      }
      smartContractMethod {
        name
        signatureHash
      }
      smartContract {
        address {
          address
          annotation
        }
      }
      transaction {
        hash
      }
      external
      gasValue
    }
  }
}`;

const variables = {
  limit: 1,
  offset: 0,
  network: 'bsc',
  contract: '0x3ac632f97f389290c61289ecc03564c2a4c20882',
  caller: '',
  method: '3b304147', // 'draw'
  dateFormat: '%Y-%m-%d',
};

module.exports = async () => {
  const bitQuery = new BitQuery(process.env.BITQUERY_API_KEY);
  const request = await bitQuery.get(query, variables);
  const {
    data: {
      data: { ethereum },
    },
  } = request;

  const lastDrawData = ethereum.smartContractCalls[0];

  return {
    lastDraw: lastDrawData?.block?.timestamp?.time,
    lastTxHash: lastDrawData?.transaction?.hash
  };
};
