import React from 'react'
import { connect } from 'react-redux'

import { getWholeData } from 'actions/actions.js'
import { getLatLngFromCoords, getPlaceDescription } from 'utilities/utilities'
import LocationIcon from 'components/common/LocationIcon/LocationIcon'
import LocationInput from 'components/common/LocationInput/LocationInput'
import styles from './LocationList.module.scss'

const handleChangeLocationList = (event, coords, getWholeData) => {
  event.preventDefault()
  const { latitude, longitude } = getLatLngFromCoords(coords)
  getWholeData(latitude, longitude)
}

const LocationList = ({ places, isSearchDone, getWholeData }) => (
  <div className={`dropdown ${styles.locationList}`}>
    <button
      className={`btn btn-outline-light dropdown-toggle ${styles.dropButton}`}
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <LocationIcon />
      <span>Change Location</span>
    </button>
    <div className={`dropdown-menu ${styles.dropdownMenuLinks}`} aria-labelledby="dropdownMenuButton">
      <LocationInput />
      {
        isSearchDone &&
          places.map(
            ({ id, text, center: coords, place_name: placeName }) => (
              <a className="dropdown-item"
                href="#"
                key={id}
                onClick={(event) => handleChangeLocationList(event, coords, getWholeData)}
              >
                {`${text}, ${getPlaceDescription(placeName)}`}
              </a>
            )
          )
      }
    </div>
  </div>
)

const mapStateToProps = state => ({
  places: state.mapData.features,
  isSearchDone: state.isSearchDone
})

const mapDispatchToProps = dispatch => ({
  getWholeData: (latitude, longitude) => dispatch(getWholeData(latitude, longitude)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
