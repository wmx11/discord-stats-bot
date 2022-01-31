const { intervalToDuration } = require('date-fns');

const coreEmbed = require('../utils/coreEmbed');
const getPlayStats = require('../utils/data/getPlayStats');

module.exports = async (message) => {
  const { channel } = message;
  try {
    const [stats] = await getPlayStats(null, {
      limit: 1,
      sort: {
        date: -1,
      },
    });

    const { totalSupply, players, nextDraw, lastPlayPrize, winningWallets, lastTxHash } = stats;

    const { days, hours, minutes } = intervalToDuration({
      start: Date.now(),
      end: nextDraw,
    });

    const timeTillNextDraw = `${days} days ${hours} hours ${minutes} minutes`;

    const getWinningWallets = winningWallets.join('\n');
    const getBscScanTxLink = `https://bscscan.com/tx/${lastTxHash}`;

    const embed = {
      ...coreEmbed,
      title: 'Titano PLAY stats',
      author: {
        name: message.author.username,
        icon_url: message.author.displayAvatarURL() || '',
      },
      thumbnail: {
        url: channel.guild.iconURL() || '',
      },
      fields: [
        {
          name: '$TITANO Staked on PLAY',
          value: totalSupply.toLocaleString('en-US'),
          inline: false,
        },
        {
          name: 'People in PLAY',
          value: players.toLocaleString('en-US'),
          inline: false,
        },
        {
          name: 'Previous $TITANO Prize',
          value: lastPlayPrize.toLocaleString('en-US'),
          inline: false,
        },
        {
          name: 'Next Draw in:',
          value: timeTillNextDraw,
          inline: false,
        },
        {
          name: 'Previous Winning Wallets',
          value: getWinningWallets,
          inline: false,
        },
        {
          name: 'Previous Prize Draw TX',
          value: getBscScanTxLink,
          inline: false,
        },
      ],
    };
    return channel.send({ embeds: [embed] });
  } catch (error) {
    return channel.send(
      "Bzzzzt. Couldn't fetch the stats :( Try again a little later."
    );
  }
};
