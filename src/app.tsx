import { useState } from 'preact/hooks'
import './app.css'
import HomeView from './views/home'
import SettingsView from './views/settings'
import GearIcon from './icons/gear'
import packageJson from '../package.json'

export function App() {
  const [view, setView] = useState('HomeView')

  function toggleView() {
    setView(view === 'HomeView' ? 'SettingsView' : 'HomeView')
  }

  return (
    <>
      <nav class="nav">
        <h1 class="nav__title">
          Status Check Helper
          <small class="nav__title__version">
            v{packageJson.version}
          </small>
        </h1>
        <button
          class="nav__settings"
          onClick={toggleView}
        >
          <GearIcon />
        </button>
      </nav>

      <main class="main">
        {view === 'HomeView' ?
          <HomeView /> :
          <SettingsView />}
      </main>
    </>
  )
}
