import { render, ComponentChild } from 'preact'
import ModalButton from './modal'
import PageButton from './page'

export function insertButton(button: ComponentChild) {
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

async function onUrlChange() {
  const [, path] = window.location.pathname.split('/');
  await chrome.storage.sync.set({ hostname: window.location.hostname });

  return insertButton(path === 'browse' ? <PageButton /> : <ModalButton />)
}

let lastUrl = location.href;
let observer = await onUrlChange();

new MutationObserver(async () => {
  const url = location.href;
  if (url !== lastUrl) {
    observer.disconnect();
    lastUrl = url;
    observer = await onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });
