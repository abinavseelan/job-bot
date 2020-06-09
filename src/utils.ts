export const parseTable = (): Array<{ link: string; text: string }> => {
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
