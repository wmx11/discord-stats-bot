const { intervalToDuration, format } = require('date-fns');
const { toDays } = require('duration-fns');

const calculateCompoundingEffect = require('../utils/calculateCompoundingEffect');
const moneyFormat = require('../utils/moneyFormat');
const coreEmbed = require('../utils/coreEmbed');

const {
  rewards: { perDay },
  startDate,
} = require('../config');
const getStats = require('../utils/data/getStats');

module.exports = async (message) => {
  const { channel } = message;
  const fetchingMessage = await channel.send('Fetching stats...');

  try {
    const [stats] = await getStats(null, {
      limit: 1,
      sort: {
        date: -1,
      },
    });
    
    const { marketCap, rfv, treasury, price, holders, date } = stats;

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
          value: moneyFormat(price),
          inline: true,
        },
        {
          name: 'Treasury',
          value: moneyFormat(treasury, 6),
          inline: false,
        },
        {
          name: 'RFV',
          value: moneyFormat(rfv, 6),
          inline: true,
        },
        {
          name: 'Holders',
          value: holders.toString(),
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
      ]
    };

    fetchingMessage.delete();
    return channel.send({ embeds: [embed] });
  } catch (error) {
    return channel.send(
      "Bzzzzt. Couldn't fetch the stats :( Try again a little later."
    );
  }
};
