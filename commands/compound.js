const calculateCompoundingEffect = require('../utils/calculateCompoundingEffect');
const {
  rewards: { perDay },
  taxes: { sell: sellTax }
} = require('../config');
const moneyFormat = require('../utils/moneyFormat');
const getStats = require('../utils/data/getStats');

module.exports = async (message) => {
  // !!compound <tokens amount> for <number of days> days
  const { channel } = message;
  const content = message.toString();
  const [, tokens, ...rest] = content.split(' ');
  const sanitizedTokenAmount = tokens ? tokens.replace(/\,/g, '') : 0;
  const tokenAmount = parseInt(sanitizedTokenAmount, 10);
  const numberOfDays = parseInt(rest[1], 10);
  const isDaysUsedInCommand = rest[2] === 'days';

  const toLocale = (number) => number.toLocaleString('en-US');

  if (!tokenAmount || !numberOfDays) {
    return;
  }

  if (!isDaysUsedInCommand) {
    return channel.send('Bzzzzt. Please enter "days" `!!compound <tokens amount> for <number of days> days`');
  }

  const [stats] = await getStats(null, {
    limit: 1,
    sort: {
      date: -1,
    },
  });

  const { price: titanoPriceUsd } = stats;

  const compoundedAmount = calculateCompoundingEffect(
    tokenAmount,
    perDay,
    numberOfDays
  ).toFixed(4);

  const priceValue = (titanoPriceUsd * compoundedAmount).toFixed(4);
  const priceFromRewardsValue = ((compoundedAmount - tokenAmount) * titanoPriceUsd).toFixed(4);
  const priceFromRewards = moneyFormat(priceFromRewardsValue, 6);
  const price = moneyFormat(priceValue, 6);
  const priceAfterSellTax = priceValue * (1 - sellTax);
  const initialUsdBalance = (tokenAmount * titanoPriceUsd);
  const profitValue = priceAfterSellTax - initialUsdBalance;

  const compoundMessage = `
  **${toLocale(
    tokenAmount
    )}** $TITANO compounded over **${numberOfDays}** days will approximately yield:
  **Your initial USD balance: ** ${moneyFormat(initialUsdBalance, 6)}

  **Compounding rewards: ** ${toLocale(compoundedAmount - tokenAmount)} $TITANO
  **$TITANO Total: ** ${toLocale(parseInt(compoundedAmount, 10))} $TITANO

  **$USD Value from rewards: ** ${priceFromRewards}
  **$USD Avg. over ${numberOfDays} days: ** ${moneyFormat(priceFromRewardsValue / numberOfDays, 6)}
  **$USD Value: ** ${price}

  **Will you be in profit after ${numberOfDays} days?** ${ profitValue > 0 ? 'Yes! 💰' : 'No... 😓'}

  *$USD Value after ${sellTax * 100}% sell tax: ${moneyFormat(priceAfterSellTax, 6)}*
  `;

  return channel.send(compoundMessage);
};
