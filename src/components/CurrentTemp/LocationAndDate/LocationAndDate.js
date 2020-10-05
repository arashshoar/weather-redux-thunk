import React from 'react'

import styles from './LocationAndDate.module.scss'

const LocationAndDate = ({ cityName, countryName, date, time }) => (
  <div className={styles.locationAndDate}>
    <div>In The Name of GOD</div>
    <div className={styles.city}>{cityName}</div>
    <div className={styles.country}>{countryName}</div>
    <div className={styles.dateTime}>{date}, {time}</div>
  </div>
)

export default LocationAndDate
