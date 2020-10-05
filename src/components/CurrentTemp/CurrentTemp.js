import React from 'react'
import { connect } from 'react-redux'
import { getDateTimeFromMilSecs, getDesOfWeather } from 'utilities/utilities'
import { SRC } from 'utilities/constants'

import styles from './CurrentTemp.module.scss'
import UpArrowIcon from "../common/UpArrowIcon";
import DownArrowIcon from "../common/DownArrowIcon";

const CurrentTemp = ({ cityName, countryName, dt, weather, maxTemp, minTemp, currentTemp }) => {
  const {time, date} = getDateTimeFromMilSecs(dt)
  console.log('Weathe: ', weather)
  const description = getDesOfWeather(weather)

  return (
    <div className={styles.currentTemp}>

      <div className={styles.tempHeader}>
        <div className={styles.locationTime}>
          <div>In The Name of GOD</div>
          <div>{cityName}</div>
          <div>{countryName}</div>
          <div>{date}, {time}</div>
        </div>

        <div className="dropdown">
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
      </div>

      <div className={styles.tempFooter}>
        <div className={styles.description}>
          <img src={SRC.clearDayIcon} alt=""/>
          <div>{description}</div>
        </div>
        <div className={styles.minMax}>
          <UpArrowIcon/>
          <span>{Math.round(maxTemp)}&deg;</span>
          <DownArrowIcon/>
          <span>{Math.round(minTemp)}&deg;</span>
        </div>
        <div className={styles.temp}>{Math.round(currentTemp)}&deg;</div>
      </div>
      
      
    </div>
  )
}

const mapStateToProps = state => ({
  cityName: state.cityName,
  countryName: state.countryName,
  currentTemp: state.currentWeatherData.main.temp,
  maxTemp: state.currentWeatherData.main.temp_max,
  minTemp: state.currentWeatherData.main.temp_min,
  dt: state.currentWeatherData.dt,
  weather: state.currentWeatherData.weather,
})

export default connect(mapStateToProps, null)(CurrentTemp)
