const { add, sub, set, parseISO, format, isAfter } = require('date-fns');
const axios = require('axios');

const mongoose = require('mongoose');
const Play = mongoose.model('plays');

const getPlayTokensTotalSupply = require('../modules/dataGetters/bscscan/getPlayTokensTotalSupply');
const getPlayPlayers = require('../modules/dataGetters/play/getPlayPlayers');
const getLastDraw = require('../modules/dataGetters/play/getLastDraw');
const getDrawDetails = require('../modules/dataGetters/play/getDrawDetails');

const { playDurationDays, botEndpoint, mainChannelId } = require('../config');

module.exports = async () => {
  try {
    const totalSupply = await getPlayTokensTotalSupply();
    const players = await getPlayPlayers();

    const [playStats] = await Play.find({}, null, {
      limit: 1,
      sort: {
        date: -1,
      },
    });

    const nextDraw = playStats?.nextDraw
      ? playStats.nextDraw
      : sub(Date.now(), { days: 1 });

    const isTimeForNextDraw = isAfter(Date.now(), nextDraw);
    
    if (isTimeForNextDraw) {
      const { lastDraw, lastTxHash } = await getLastDraw();

      if (lastTxHash === playStats.lastTxHash) {
        return;
      }

      const lastDrawDetails = await getDrawDetails(lastTxHash);

      const lastPlayPrize = lastDrawDetails.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.amount;
        },
        0
      );

      const winningWallets = lastDrawDetails.map(
        (lastDraw) => lastDraw.receiver.address
      );

      const nextDraw = set(
        add(parseISO(lastDraw), { days: playDurationDays }),
        {
          hours: 16,
          minutes: 1,
          seconds: 0,
        }
      );

      const lastDrawUtc = set(parseISO(lastDraw), {
        hours: 16,
        minutes: 0,
        seconds: 0,
      });

      await new Play({
        totalSupply,
        players,
        lastTxHash,
        lastDraw: lastDrawUtc,
        nextDraw,
        lastPlayPrize,
        winningWallets,
        date: Date.now(),
      }).save();

      const winnersMessage = `
      🚀🚀🚀**PLAY IS UP AND WE HAVE OUR WINNERS!**🚀🚀🚀

The grand prize of **${lastPlayPrize.toLocaleString('en-US')}** $TITANO has been distributed amongst these wallets:

${winningWallets.join('\n')}

**CONGRATULATIONS!**

Prize Draw Transaction can be found here:
<${`https://bscscan.com/tx/${lastTxHash}`}>`;

      await axios({
        method: 'POST',
        url: `${botEndpoint}/bot-post`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          channelId: mainChannelId,
          message: winnersMessage,
        },
      });
    } else {
      const { nextDraw, lastTxHash, lastDraw, lastPlayPrize, winningWallets } =
        playStats;

      await new Play({
        totalSupply,
        players,
        lastTxHash,
        lastDraw,
        nextDraw,
        lastPlayPrize,
        winningWallets,
        date: Date.now(),
      }).save();
    }
    console.log(
      `${format(Date.now(), 'yyy-MM-dd HH:mm:ss')} - Play Stats Updated`
    );
  } catch (error) {
    console.log(error);
  }
};
