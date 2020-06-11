import fetch from 'node-fetch';

import Atlassian from './jobs/atlassian';
import Uber from './jobs/uber';

import { runner } from './utils';

(async () => {
  const results = await runner(Atlassian, Uber);

  results.forEach(async (result, index) => {
    if (result.status === 'rejected') {
      console.error(`Job ${index + 1} failed`);
      console.error(result.reason);
      return;
    }

    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'post',
        body: JSON.stringify(result.value),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.log(`[POST] ${JSON.stringify(result.value, null, 2)}`);
    }
  });
})();
