import React, { useState, useEffect, useRef } from 'react'

function LocationList() {
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gridRef = useRef(null)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setLocations(data.results)
        setInfo(data.info)
      })
  }, [page])

  // const handlePrev = () => {
  //   if (activeIndex > 0) {
  //     setActiveIndex(activeIndex - 1)
  //   }
  // }

  // const handleNext = () => {
  //   if (activeIndex < locations.length - 1) {
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
    <div className="location-list">
      <h2>Locations</h2>
      <div className="slider-container">
        {/* <button className="slider-button prev" onClick={handlePrev}>
          &#8249;
        </button> */}
        <div className="grid" ref={gridRef}>
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`card ${index === activeIndex ? 'active' : ''}`}
            >
              <h3>{location.name}</h3>
              <p>Type: {location.type}</p>
              <p>Dimension: {location.dimension}</p>
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

export default LocationList

