import React, { useState, useEffect } from 'react'

function LocationList() {
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setLocations(data.results)
        setInfo(data.info)
      })
  }, [page])

  return (
    <div className="location-list">
      <h2>Locations</h2>
      <div className="grid">
        {locations.map(location => (
          <div key={location.id} className="card">
            <h3>{location.name}</h3>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
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

export default LocationList

