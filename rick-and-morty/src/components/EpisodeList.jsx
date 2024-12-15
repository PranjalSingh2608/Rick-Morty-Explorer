import React, { useState, useEffect, useRef } from 'react'

function EpisodeList() {
  const [episodes, setEpisodes] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.results)
        setInfo(data.info)
      })
  }, [page])

  // const handlePrev = () => {
  //   if (activeIndex > 0) {
  //     setActiveIndex(activeIndex - 1)
  //   }
  // }

  // const handleNext = () => {
  //   if (activeIndex < episodes.length - 1) {
  //     setActiveIndex(activeIndex + 1)
  //   }
  // }

  useEffect(() => {
    if (gridRef.current) {
      const cardWidth = 265 // card width (250px) + margin (15px)
      gridRef.current.style.transform = `translateX(-${activeIndex * cardWidth}px)`
    }
  }, [activeIndex])

  return (
    <div className="episode-list">
      <h2>Episodes</h2>
      <div className="slider-container">
        {/* <button className="slider-button prev" onClick={handlePrev}>
          &#8249;
        </button> */}
        <div className="grid" ref={gridRef}>
          {episodes.map((episode, index) => (
            <div
              key={episode.id}
              className={`card ${index === activeIndex ? 'active' : ''}`}
            >
              <h3>{episode.name}</h3>
              <p>Air Date: {episode.air_date}</p>
              <p>Episode: {episode.episode}</p>
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

export default EpisodeList

