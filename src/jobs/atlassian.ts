import puppeteer from 'puppeteer';
import { parseTable, generateSlackPayload } from '../utils';

const BASE_URL = 'https://www.atlassian.com';

const job = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://www.atlassian.com/company/careers/all-jobs?team=&location=Bengaluru%2CRemote&search=', {
    waitUntil: 'networkidle0',
    timeout: 0,
  });

  const positions = await page.evaluate(parseTable);

  await browser.close();

  const payload = generateSlackPayload('Atlassian', positions, BASE_URL);

  return payload;
};

export default job;
