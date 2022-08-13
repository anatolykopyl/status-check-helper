import './style.css'
import { insertButton, sendTask } from './utils'

function Button() {
  function createTask() {
    const issueId = window.location.pathname.split('/').pop() as string;
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
  console.log("Page mode")
  insertButton(<Button />)
}