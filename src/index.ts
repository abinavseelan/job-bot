import fetch from 'node-fetch';

import Atlassian from './jobs/atlassian';

import { runner } from './utils';

(async () => {
  const results = await runner(Atlassian);

  results.forEach(async (result, index) => {
    if (result.status === 'rejected') {
      console.error(`Job ${index + 1} failed`);
      console.error(result.reason);
      return;
    }

    await fetch(process.env.WEBHOOK_URL, {
      method: 'post',
      body: JSON.stringify(result.value),
      headers: { 'Content-Type': 'application/json' },
    });
  });
})();
