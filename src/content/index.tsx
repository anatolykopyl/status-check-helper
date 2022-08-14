import { render } from 'preact'
import createModalTask from './createModalTask'
import createPageTask from './createPageTask'
import { sendTask } from './utils'
import './style.css'

export function insertButton(button: JSX.Element): MutationObserver {
  const observer = new MutationObserver((mutationList, observer) => {
    const issueHeader = document.getElementById('jira-issue-header')
    if (issueHeader) {
      const root = document.createElement('div')
      root.id = 'sch-entry'
      issueHeader.appendChild(root)

      console.log(root)
      render(button, root)
      observer.disconnect()
    }
  })

  observer.observe(document.body, { subtree: true, childList: true });

  return observer;
}

function Button({ createTask }: { createTask: () => { issueId: string, issueName: string } }) {
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


async function onUrlChange(): Promise<MutationObserver> {
  const [, path] = window.location.pathname.split('/');
  chrome.storage.sync.set({ hostname: window.location.hostname });

  return insertButton(<Button createTask={
    path === 'browse' ? createPageTask : createModalTask
  } />)
}

(async () => {
  let lastUrl = location.href;
  let observer: MutationObserver = await onUrlChange();

  new MutationObserver(async () => {
    const url = location.href;
    if (url !== lastUrl) {
      observer.disconnect();
      lastUrl = url;
      observer = await onUrlChange();
    }
  }).observe(document, { subtree: true, childList: true });
})();
