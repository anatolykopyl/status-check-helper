import { useState, useEffect } from 'preact/hooks';

export default function SettingsView() {
  const [prefix, setPrefix] = useState('');
  const [separator, setSeparator] = useState(' - ');
  const [postfix, setPostfix] = useState('');

  function updatePrefix(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    setPrefix(value);
    chrome.storage.sync.set({ prefix: value });
  }

  function updateSeparator(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    setSeparator(value);
    chrome.storage.sync.set({ separator: value });
  }

  function updatePostfix(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    setPostfix(value);
    chrome.storage.sync.set({ postfix: value });
  }

  useEffect(() => {
    chrome.storage.sync.get(['prefix', 'separator', 'postfix'], (result) => {
      setPrefix(result.prefix);
      setSeparator(result.separator);
      setPostfix(result.postfix);
    });
  }, []);

  return (
    <div class="settings">
      <label>
        Task Format
      </label>
      <div class="settings__format">
        <input
          type="text"
          value={prefix}
          onChange={updatePrefix}
          placeholder="Prefix"
        ></input>
        ID-123
        <input
          type="text"
          value={separator}
          onChange={updateSeparator}
          placeholder="Separator"
        ></input>
        Task name
        <input
          type="text"
          value={postfix}
          onChange={updatePostfix}
          placeholder="Postfix"
        ></input>
      </div>
      <div class="settings__formatExample">
        <div>
          Will appear as:
        </div>
        <div>
          {prefix}ID-123{separator}Task name{postfix}
        </div>
      </div>
    </div>
  )
}