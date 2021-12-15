const scraper = require('../scraper');
const { contractAddress } = require('../../../config');
const { bscscan } = require('../links');

module.exports = async () => {
  const { page, closeInstance } = await scraper();
  await page.goto(`${bscscan}/token/${contractAddress}`);
  await page.waitForSelector('#ContentPlaceHolder1_tr_tokenHolders');
  const holders = await page.evaluate(() => {
    const holdersWrapper = document.querySelector(
      '#ContentPlaceHolder1_tr_tokenHolders .col-md-8 .mr-3'
    );
    if (!holdersWrapper) {
      return '0';
    }
    return parseInt(
      holdersWrapper.textContent.replace(/\,/g, ''),
      10
    ).toString();
  });
  await closeInstance();
  return holders;
};
