export default function createTask() {
  const issueId = window.location.pathname.split('/').pop() as string;
  const issueHeader = window.document.querySelector('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]') as HTMLElement;
  const issueName = issueHeader.innerText;

  return { issueId, issueName };
}
