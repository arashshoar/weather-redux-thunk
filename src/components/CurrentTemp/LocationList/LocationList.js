import React from 'react'
import styles from './LocationList.module.scss'

const LocationList = () => (
  <div className={`dropdown ${styles.locationList}`}>
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button" id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Dropdown button
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
)

export default LocationList
