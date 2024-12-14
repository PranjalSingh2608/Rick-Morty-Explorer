import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CharacterList from './components/CharacterList'
import LocationList from './components/LocationList'
import EpisodeList from './components/EpisodeList'
import { Sun, Moon } from 'lucide-react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <div className={`app ${theme}`}>
        <header>
          <div className="header-content">
            <h1>Rick and Morty Explorer</h1>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
          </div>
          <nav>
            <Link to="/characters">
              <button>Characters</button>
            </Link>
            <Link to="/locations">
              <button>Locations</button>
            </Link>
            <Link to="/episodes">
              <button>Episodes</button>
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<p>Select a tab to explore!</p>} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/locations" element={<LocationList />} />
            <Route path="/episodes" element={<EpisodeList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
