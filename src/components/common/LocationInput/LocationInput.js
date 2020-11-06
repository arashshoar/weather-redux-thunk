import React from 'react'
import { connect } from 'react-redux'
import { fetchLocations } from 'utilities/utilitiesPart2'
import { setIsSearchDone } from 'actions/actions'
import { getWholeData, setMapData } from 'actions/actions'

import styles from './LocationInput.module.scss'

export const handleChangeInput = setLocationName => event => setLocationName(event.target.value)

export const handleKeyDown = (locationName, setIsSearchDone, setMapData) => event => {

  if (event.key === 'Enter') {
    handleSearchButtonClick(locationName, setIsSearchDone, setMapData)
  }
}

export const handleSearchButtonClick = async (locationName, setIsSearchDone, setMapData, getWholeData) => {

  if (getWholeData) {
    const { data: { features: [{ center: [longitude, latitude] }] } } = await fetchLocations({ locationName })
    getWholeData(latitude, longitude)
  } else {
    const { data: mapData } = await fetchLocations({ locationName })
    setMapData(mapData)
  }

  setIsSearchDone(true)
}

const LocationInput = ({ setIsSearchDone, getWholeData, setMapData }) => {
  const [locationName, setLocationName] = React.useState('')
  return (
    <>
      <div className={`input-group mb-3 ${styles.locationInput}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a location"
          aria-label="Search for a location"
          aria-describedby="button-addon2"
          value={locationName}
          onChange={handleChangeInput(setLocationName)}
          onKeyDown={handleKeyDown(locationName, setIsSearchDone, setMapData)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => handleSearchButtonClick(locationName, setIsSearchDone, setMapData, getWholeData)}
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setMapData: mapData => dispatch(setMapData(mapData)),
  setIsSearchDone: isSearchDone => dispatch(setIsSearchDone(isSearchDone)),
  getWholeData: (latitude, longitude) => dispatch(getWholeData(latitude, longitude)),
})

export default connect(null, mapDispatchToProps)(LocationInput)
