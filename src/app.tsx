import { useEffect, useState } from 'preact/hooks'
import './app.css'
import ClipboardIcon from './icons/clipboard'
import ClipboardCheckIcon from './icons/clipboardCheck';
import CrossIcon from './icons/cross';

export function App() {
  const [tasks, setTasks] = useState({});
  const [hostname, setHostname] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getTasks()
    getHostname()
  }, []);

  async function getTasks() {
    const result = await chrome.storage.sync.get(['tasks']);
    setTasks(result.tasks);
  }

  async function getHostname() {
    const result = await chrome.storage.sync.get(['hostname']);
    setHostname(result.hostname);
    console.log(result.hostname);
  }

  function tasksText() {
    const base = 'https://' + hostname + '/browse/'

    let value = '<ul>'

    for (const key in tasks) {
      value += `<li><a href="${base + key}">${key}</a> - ${tasks[key as keyof typeof tasks]}</li>`
    }

    value += '</ul>'

    return value;
  }

  function copyToClipboard() {
    function listener(event: ClipboardEvent) {
      event.clipboardData?.setData("text/html", tasksText());
      event.clipboardData?.setData("text/plain", tasksText());
      event.preventDefault();
    }

    document.addEventListener("copy", listener);
    document.execCommand('copy');
    document.removeEventListener("copy", listener);

    setCopied(true);
  }

  function deleteTask(id: string) {
    const newTasks = { ...tasks };
    delete newTasks[id as keyof typeof tasks];
    setTasks(newTasks);
    chrome.storage.sync.set({ tasks: newTasks });
  }

  function resetStorage() {
    chrome.storage.sync.clear()
    setTasks({});
  }

  return (
    <>
      <h1>Status Check Helper</h1>

      <ul id='tasks'>
        {Object.keys(tasks).map(key => {
          return (
            <li>
              <div class="task">
                <span>{key} - {tasks[key as keyof typeof tasks]}</span>
                <div
                  class="deleteTask"
                  onClick={() => deleteTask(key)}
                >
                  <CrossIcon />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div class="buttons">
        <button
          onClick={copyToClipboard}
          class="button"
        >
          {copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
          Copy to clipboard
        </button>
        <button
          onClick={resetStorage}
          class="button"
        >
          Clear all
        </button>
      </div>
    </>
  )
}
