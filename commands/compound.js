const CoinGecko = require('coingecko-api');
const calculateCompoundingEffect = require('../utils/calculateCompoundingEffect');
const {
  rewards: { perDay },
  taxes: { sell: sellTax }
} = require('../config');
const moneyFormat = require('../utils/moneyFormat');

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

  /**
   * @desc - Init the coinGecko client
   */
  const CoinGeckoClient = new CoinGecko();

  /**
   * @desc - Titano coin
   */
  const {
    data: { market_data: titano },
  } = await CoinGeckoClient.coins.fetch('titano', {});

  const compoundedAmount = calculateCompoundingEffect(
    tokenAmount,
    perDay,
    numberOfDays
  ).toFixed(4);

  const priceValue = (titano.current_price.usd * compoundedAmount).toFixed(4);
  const priceFromRewardsValue = ((compoundedAmount - tokenAmount) * titano.current_price.usd).toFixed(4);
  const priceFromRewards = moneyFormat(priceFromRewardsValue, 6);
  const price = moneyFormat(priceValue, 6);

  const compoundMessage = `
  **${toLocale(
    tokenAmount
    )}** $TITANO compounded over **${numberOfDays}** days will approximately yield:
  **Compounding rewards: ** ${toLocale(compoundedAmount - tokenAmount)} $TITANO
  **$TITANO Total: ** ${toLocale(parseInt(compoundedAmount, 10))} $TITANO
  **$USD Value from rewards: ** ${priceFromRewards}
  **$USD Avg. over ${numberOfDays} days: ** ${moneyFormat(priceFromRewardsValue / numberOfDays, 6)}
  **$USD Value: ** ${price}
  *$USD Value after ${sellTax * 100}% sell tax: ${moneyFormat(priceValue * (1 - sellTax), 6)}*
  `;

  return channel.send(compoundMessage);
};
