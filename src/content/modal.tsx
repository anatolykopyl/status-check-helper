import './style.css'
import { sendTask, insertButton } from './utils';

function Button() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  function createTask() {
    const issueId = params.selectedIssue;
    const issueHeader = window.document.querySelector('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]') as HTMLElement;
    const issueName = issueHeader.innerText;

    return { issueId, issueName };
  }

  return (
    <button
      class="button"
      onClick={() => {
        sendTask(createTask())
      }}
    >
      Add to todays bulletpoints
    </button >
  )
}

export default () => {
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      const target = mutation.target as HTMLElement;
      const headerElement = target?.querySelector?.('#jira-issue-header');

      if (headerElement) {
        insertButton(<Button />)
      }
    }
  });

  observer.observe(document, config);
  console.log(window.location.hostname)
  chrome.storage.sync.set({ hostname: window.location.hostname });
}
