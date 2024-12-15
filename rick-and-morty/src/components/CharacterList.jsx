import React, { useState, useEffect, useRef } from 'react'

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results)
        setInfo(data.info)
      })
  }, [page])

  // const handlePrev = () => {
  //   if (activeIndex > 0) {
  //     setActiveIndex(activeIndex - 1)
  //   }
  // }

  // const handleNext = () => {
  //   if (activeIndex < characters.length - 1) {
  //     setActiveIndex(activeIndex + 1)
  //   }
  // }

  useEffect(() => {
    if (gridRef.current) {
      const cardWidth = 265 
      gridRef.current.style.transform = `translateX(-${activeIndex * cardWidth}px)`
    }
  }, [activeIndex])

  return (
    <div className="character-list">
      <h2>Characters</h2>
      <div className="slider-container">
        {/* <button className="slider-button prev" onClick={handlePrev}>
          &#8249;
        </button> */}
        <div className="grid" ref={gridRef}>
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`card ${index === activeIndex ? 'active' : ''}`}
            >
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          ))}
        </div>
        {/* <button className="slider-button next" onClick={handleNext}>
          &#8250;
        </button> */}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={!info?.prev}>
          Previous Page
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={!info?.next}>
          Next Page
        </button>
      </div>
    </div>
  )
}

export default CharacterList

