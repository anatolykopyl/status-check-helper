import { useEffect, useState } from 'preact/hooks'
import ClipboardIcon from '../icons/clipboard'
import ClipboardCheckIcon from '../icons/clipboardCheck';
import CrossIcon from '../icons/cross';

export default function HomeView() {
  const [tasks, setTasks] = useState({});
  const [hostname, setHostname] = useState('');
  const [copied, setCopied] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [separator, setSeparator] = useState('');
  const [postfix, setPostfix] = useState('');

  useEffect(() => {
    getTasks()
    getHostname()
    getFormatting()
  }, []);

  async function getFormatting() {
    const result = await chrome.storage.sync.get(['prefix', 'separator', 'postfix']);
    setPrefix(result.prefix ?? '');
    setSeparator(result.separator ?? ' - ');
    setPostfix(result.postfix ?? '');
  }

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
      value += `<li>${prefix}<a href="${base + key}">${key}</a>${separator}${tasks[key as keyof typeof tasks]}${postfix}</li>`
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
      {Object.keys(tasks).length ?
        <div class="home">
          <ul class='home__tasks'>
            {Object.keys(tasks).map(key => {
              return (
                <li>
                  <div class="home__tasks__task">
                    <span>{prefix}{key}{separator}{tasks[key as keyof typeof tasks]}{postfix}</span>
                    <div
                      class="home__tasks__task__deleteTask"
                      onClick={() => deleteTask(key)}
                    >
                      <CrossIcon />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div class="home__buttons">
            <button
              onClick={copyToClipboard}
              class="home__buttons__button"
            >
              {copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
              Copy to clipboard
            </button>
            <button
              onClick={resetStorage}
              class="home__buttons__button"
            >
              Clear all
            </button>
          </div>
        </div>
        :
        <div class="home">
          Tasks will appear here
        </div>
      }
    </>
  )
}
