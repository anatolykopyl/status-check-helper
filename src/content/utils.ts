export async function sendTask({ issueId, issueName }: { issueId: string; issueName: string; }) {
  const result = await chrome.storage.sync.get(['tasks'])

  const newTasks = result.tasks ?? {}
  newTasks[issueId] = issueName
  chrome.storage.sync.set({ tasks: newTasks });
}
