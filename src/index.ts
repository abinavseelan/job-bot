import puppeteer from 'puppeteer';

import { parseTable } from './utils';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.atlassian.com/company/careers/bengaluru', { waitUntil: 'networkidle0' });

    const positions = await page.evaluate(parseTable);

    await browser.close();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
