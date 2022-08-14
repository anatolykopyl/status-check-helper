export default function createTask() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const issueId = params.selectedIssue;
  const issueHeader = window.document.querySelector('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]') as HTMLElement;
  const issueName = issueHeader.innerText;

  return { issueId, issueName };
}
