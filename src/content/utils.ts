import { render, ComponentChild } from 'preact'

export async function sendTask({ issueId, issueName }: { issueId: string; issueName: string; }) {
  const result = await chrome.storage.sync.get(['tasks'])

  const newTasks = result.tasks ?? {}
  newTasks[issueId] = issueName
  chrome.storage.sync.set({ tasks: newTasks });
}

export function insertButton(button: ComponentChild) {
  const issueHeader = document.getElementById('jira-issue-header')
  const root = document.createElement('div')
  root.id = 'sch-entry'
  issueHeader?.appendChild(root)

  render(button, document.getElementById('sch-entry') as HTMLElement)
}
