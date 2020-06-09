const BASE_URL = 'https://www.atlassian.com/';

interface Position {
  link: string;
  text: string;
}

export const parseTable = (): Array<Position> => {
  const jobListingContainer = document.querySelector('div.careers');

  if (!jobListingContainer) {
    throw new Error('Could not query container');
  }

  const engineeringJobs = Array.from(jobListingContainer.children).find((child) => {
    return child.children[0]?.innerHTML === 'Engineering';
  });

  if (!engineeringJobs) {
    throw new Error('Could not find engineering section');
  }

  const positions = engineeringJobs.querySelectorAll('table tr td a');

  const result = Array.from(positions).map((position: HTMLAnchorElement) => {
    return {
      link: position.pathname,
      text: position.text,
    };
  });

  return result;
};

export const generateSlackPayload = (positions: Array<Position>) => {
  const payload: { blocks: any } = {
    blocks: [],
  };

  payload.blocks.push({
    type: 'section',
    text: {
      type: 'plain_text',
      emoji: true,
      text: 'Hey 👋',
    },
  });

  payload.blocks.push({
    type: 'section',
    text: {
      type: 'plain_text',
      emoji: true,
      text: 'Here are the Atlassian job listings for Bangalore this week.',
    },
  });

  payload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*<${process.env.TRAVIS_BUILD_WEB_URL}|View Travis Job>*`,
    },
  });

  payload.blocks.push({
    type: 'divider',
  });

  payload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*Frontend roles:*',
    },
  });

  const frontendRoles = positions.filter((position) => {
    return position.text.toLowerCase().indexOf('frontend') !== -1;
  });

  frontendRoles.forEach((role) => {
    payload.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${role.text}*\n*<${BASE_URL}${role.link}|Visit listing>*`,
      },
    });
  });

  const otherRoles = positions.filter((position) => {
    return position.link.toLowerCase().indexOf('frontend') === -1;
  });

  payload.blocks.push({
    type: 'divider',
  });

  payload.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*Other roles:*',
    },
  });

  otherRoles.forEach((role) => {
    payload.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${role.text}*\n*<${BASE_URL}${role.link}|Visit listing>*`,
      },
    });
  });

  return payload;
};
