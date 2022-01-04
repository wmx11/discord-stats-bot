const CoinGecko = require('coingecko-api');
const { intervalToDuration } = require('date-fns');
const { toDays } = require('duration-fns');

const getHolders = require('../modules/scrapers/bscscan/getHolders');
const getMarketCap = require('../modules/scrapers/bscscan/getMarketCap');
const getRfvBalance = require('../modules/scrapers/bscscan/getRfvBalance');
const getTreasuryBalance = require('../modules/scrapers/bscscan/getTreasuryBalance');

const calculateCompoundingEffect = require('../utils/calculateCompoundingEffect');
const moneyFormat = require('../utils/moneyFormat');
const coreEmbed = require('../utils/coreEmbed');
const cacheState = require('../utils/cacheState');
const setCacheState = require('../utils/setCacheState');

const {
  rewards: { perDay },
  startDate
} = require('../config');

const state = cacheState();

/**
 * @desc - Init the coinGecko client
 */
const CoinGeckoClient = new CoinGecko();

module.exports = async (message) => {
  const { channel } = message;
  const fetchingMessage = await channel.send('Fetching stats...');

  try {
    if (state.isFetched) {
      fetchingMessage.delete();
      return channel.send({ embeds: [state.cachedData] });
    }

    /**
     * @desc - Gets the duration since the start of Titano project
     */

    const getDays = () => {
      const date = intervalToDuration({
        start: new Date(startDate),
        end: new Date(),
      });
      return Math.floor(toDays(date));
    };

    /**
     * @desc - Titano coin
     */
    const {
      data: { market_data: titano },
    } = await CoinGeckoClient.coins.fetch('titano', {});

    /**
     * @desc - BNB coin
     */
    const {
      data: { market_data: bnb },
    } = await CoinGeckoClient.coins.fetch('binancecoin', {});

    const holders = await getHolders();
    const marketCap = await getMarketCap(titano.current_price.usd);
    const treasuryBalance = await getTreasuryBalance(bnb.current_price.usd);
    const rvfBalance = await getRfvBalance(bnb.current_price.usd);

    const embed = {
      ...coreEmbed,
      title: 'Titano Stats',
      author: {
        name: message.author.username,
        icon_url: message.author.displayAvatarURL() || '',
      },
      thumbnail: {
        url: channel.guild.iconURL() || '',
      },
      fields: [
        {
          name: 'Market Cap',
          value: moneyFormat(marketCap, 6),
          inline: true,
        },
        {
          name: 'Price',
          value: moneyFormat(titano.current_price.usd),
          inline: true,
        },
        {
          name: 'Treasury',
          value: moneyFormat(treasuryBalance, 6),
          inline: false,
        },
        {
          name: 'RFV',
          value: moneyFormat(rvfBalance, 6),
          inline: true,
        },
        {
          name: 'Holders',
          value: holders,
          inline: false,
        },
        {
          name: 'Current Index',
          value: calculateCompoundingEffect(1, perDay, getDays())
            .toFixed(4)
            .toString(),
          inline: true,
        },
        {
          name: 'Time Elapsed',
          value: `${getDays()} days`,
          inline: true,
        },
      ],
      footer: {
        text: `Prices calculated using CoinGecko`,
      },
    };

    fetchingMessage.delete();

    setCacheState(state, embed);

    return channel.send({ embeds: [embed] });
  } catch (error) {
    return channel.send("Bzzzzt. Couldn't fetch the stats :( Try again a little later.");
  }
};
