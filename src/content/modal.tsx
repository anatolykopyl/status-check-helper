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
  console.log("Modal mode")
  insertButton(<Button />)
}
