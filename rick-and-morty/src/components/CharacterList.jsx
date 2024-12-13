import React, { useState, useEffect } from 'react'

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results)
        setInfo(data.info)
      })
  }, [page])

  return (
    <div className="character-list">
      <h2>Characters</h2>
      <div className="grid">
        {characters.map(character => (
          <div key={character.id} className="card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={!info?.prev}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={!info?.next}>
          Next
        </button>
      </div>
    </div>
  )
}

export default CharacterList

