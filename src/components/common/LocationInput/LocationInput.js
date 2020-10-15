import React from 'react';
import { connect } from 'react-redux';
import { fetchLocations } from 'actions/fetchActions'
import { setIsSearchDone } from 'actions/actions'

import styles from './LocationInput.module.scss'

export const handleChangeInput = setLocationName => event => setLocationName(event.target.value);

export const handleKeyDown = (locationName, fetchLocations, setIsSearchDone) => event => {

  if (event.key === 'Enter') {
    handleSearchButtonClick(locationName, fetchLocations, setIsSearchDone)
  }
}

export const handleSearchButtonClick = (locationName, fetchLocations, setIsSearchDone) => {
  fetchLocations({locationName})
  setIsSearchDone(true)
}

const LocationInput = ({ fetchLocations, setIsSearchDone }) => {
  const [locationName, setLocationName] = React.useState('');
  return (
    <>
      <div className={`input-group mb-3 ${styles.locationList}`}>
        <input
          type="text"
          className={`form-control ${styles.button}`}
          placeholder="Search for a location"
          aria-label="Search for a location"
          aria-describedby="button-addon2"
          value={locationName}
          onChange={handleChangeInput(setLocationName)}
          onKeyDown={handleKeyDown(locationName, fetchLocations, setIsSearchDone)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => handleSearchButtonClick(locationName, fetchLocations, setIsSearchDone)}
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchLocations: ({locationName, coords}) => dispatch(fetchLocations({locationName, coords})),
  setIsSearchDone: isSearchDone => dispatch(setIsSearchDone(isSearchDone))
})

export default connect(null, mapDispatchToProps)(LocationInput)
