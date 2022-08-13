import modal from './modal';
import page from './page';

async function onUrlChange() {
  console.log('url changed');
  const [, path] = window.location.pathname.split('/');
  await chrome.storage.sync.set({ hostname: window.location.hostname });

  if (path === 'browse') {
    return page()
  } else {
    return modal();
  }
}

onUrlChange();

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange()
  }
}).observe(document, { subtree: true, childList: true });
