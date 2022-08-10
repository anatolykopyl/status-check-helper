import { render } from 'preact'
import './style.css'

function Button() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  async function sendTask() {
    const issueId = params.selectedIssue;
    const issueHeader = window.document.querySelector('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]') as HTMLElement;
    const issueName = issueHeader.innerText;

    const result = await chrome.storage.sync.get(['tasks'])

    const newTasks = result.tasks ?? {}
    newTasks[issueId] = issueName
    chrome.storage.sync.set({ tasks: newTasks });
  }

  return (
    <button
      class="button"
      onClick={sendTask}
    >
      Add to todays bulletpoints
    </button >
  )
}

function insertButton() {
  const issueHeader = document.getElementById('jira-issue-header')
  const root = document.createElement('div')
  root.id = 'sch-entry'
  issueHeader?.appendChild(root)

  render(<Button />, document.getElementById('sch-entry') as HTMLElement)
}

export default () => {
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const target = mutation.target as HTMLElement;
        const headerElement = target?.querySelector?.('#jira-issue-header');

        if (headerElement) {
          insertButton()
        }
      }
    }
  });

  observer.observe(document, config);
}
