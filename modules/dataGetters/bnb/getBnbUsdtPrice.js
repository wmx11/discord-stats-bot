require('dotenv').config();

const BitQuery = require('../bitQuery/BitQuery');

const query = `
{
  ethereum(network: bsc) {
    dexTrades(
      baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
      quoteCurrency: {is: "0x55d398326f99059ff775485246999027b3197955"}
      options: {desc: ["block.height", "transaction.index"], limit: 1}
    ) {
      block {
        height
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
      }
      transaction {
        index
      }
      baseCurrency {
        symbol
      }
      quoteCurrency {
        symbol
      }
      quotePrice
    }
  }
}`;

module.exports = async () => {
  const bitQuery = new BitQuery(process.env.BITQUERY_API_KEY);
  const request = await bitQuery.get(query);
  const {
    data: {
      data: { ethereum },
    },
  } = request;
  const bnbUsdtPrice = ethereum.dexTrades[0].quotePrice;
  return bnbUsdtPrice;
};
