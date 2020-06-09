import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

import { parseTable, generateSlackPayload } from './utils';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://www.atlassian.com/company/careers/bengaluru', { waitUntil: 'networkidle0' });

    const positions = await page.evaluate(parseTable);

    await browser.close();

    const payload = generateSlackPayload(positions);

    await fetch(process.env.WEBHOOK_URL, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
