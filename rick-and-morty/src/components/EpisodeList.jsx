import React, { useState, useEffect } from 'react'

function EpisodeList() {
  const [episodes, setEpisodes] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.results)
        setInfo(data.info)
      })
  }, [page])

  return (
    <div className="episode-list">
      <h2>Episodes</h2>
      <div className="grid">
        {episodes.map(episode => (
          <div key={episode.id} className="card">
            <h3>{episode.name}</h3>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
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

export default EpisodeList

