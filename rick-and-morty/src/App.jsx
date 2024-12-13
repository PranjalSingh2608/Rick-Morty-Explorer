import React, { useState, useEffect } from 'react'
import CharacterList from './components/CharacterList'
import LocationList from './components/LocationList'
import EpisodeList from './components/EpisodeList'
import { Sun, Moon } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app ${theme}`}>
      <header>
        <div className="header-content">
          <h1>Rick and Morty Explorer</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
        <nav>
          <button
            className={activeTab === 'characters' ? 'active' : ''}
            onClick={() => setActiveTab('characters')}
          >
            Characters
          </button>
          <button
            className={activeTab === 'locations' ? 'active' : ''}
            onClick={() => setActiveTab('locations')}
          >
            Locations
          </button>
          <button
            className={activeTab === 'episodes' ? 'active' : ''}
            onClick={() => setActiveTab('episodes')}
          >
            Episodes
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'characters' && <CharacterList />}
        {activeTab === 'locations' && <LocationList />}
        {activeTab === 'episodes' && <EpisodeList />}
      </main>
    </div>
  )
}

export default App

