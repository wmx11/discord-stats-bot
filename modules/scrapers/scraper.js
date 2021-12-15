const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {
    page,
    browser,
    async closeInstance() {
      await page.close();
      await browser.close();
    },
  };
};
