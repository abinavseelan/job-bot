import puppeteer from 'puppeteer';
import { JobPosition, generateSlackPayload } from '../utils';

const BASE_URL = 'https://www.uber.com/global/en';

const evaluate = (): JobPosition[] => {
  const listings = Array.from(document.querySelectorAll<HTMLAnchorElement>('main a')).filter((i) =>
    i.getAttribute('href')?.startsWith('/careers')
  );

  const jobs = listings.map((item) => {
    const link = item.getAttribute('href') || '#';
    const text = item.innerText;
    return { link, text };
  });

  return jobs;
};

const run = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto('https://www.uber.com/us/en/careers/list/?location=IND--Bangalore');

  const data = await page.evaluate(evaluate);

  await browser.close();

  return generateSlackPayload('Uber India', data, BASE_URL);
};

export default run;
