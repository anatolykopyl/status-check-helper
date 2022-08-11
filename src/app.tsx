import { useState } from 'preact/hooks'
import './app.css'
import HomeView from './views/home'
import SettingsView from './views/settings'
import GearIcon from './icons/gear'

export function App() {
  const [view, setView] = useState(<HomeView />)
  const [viewName, setViewName] = useState('Home')

  function toggleView() {
    if (viewName === 'Home') {
      setView(<SettingsView />)
      setViewName('Settings')
    } else {
      setView(<HomeView />)
      setViewName('Home')
    }
  }

  return (
    <>
      <nav class="nav">
        <h1 class="nav__title">Status Check Helper</h1>
        <button
          class="nav__settings"
          onClick={toggleView}
        >
          <GearIcon />
        </button>
      </nav>

      <main class="main">
        {view}
      </main>
    </>
  )
}
