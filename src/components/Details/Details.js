import React from 'react'
import { connect } from 'react-redux'

import {
  getTemp,
  getWindDir,
  farenheitToCelcius,
  meterPerSecToMph,
  meterPerSecToKph,
  meterToMiles,
  getWeatherIcon,
  getIfItIsDay,
} from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './Details.module.scss'

const Details = ({ feelsLike, humidity, visibility, maxTemp, minTemp, windSpeed, windDeg, unitFC, dt, sunRise, sunSet, weather }) => (
  <GadgetContainer cardTitle="Details">
    <div className={styles.details}>
      <div className={`${styles.borderBottom}`}>
        <div className={`${styles.detailsIconContainer}`}>
          <img alt="Status" src={getWeatherIcon(weather[0].description, getIfItIsDay(sunRise, sunSet, dt))} className={styles.detailsIcon} />
        </div>
        <div className={`${styles.detailsTable}`}>
          <div className={styles.cell}>
            <div>Feels like:</div>
            <div>{`${getTemp(unitFC, feelsLike)}`}&deg;</div>
          </div>
          <div className={styles.cell}>
            <div>humidity:</div>
            <div>{humidity}%</div>
          </div>
          <div className={styles.cell}>
            <div>visibility:</div>
            <div>{meterToMiles(visibility)} miles</div>
          </div>
          <div className={`${styles.cell} ${styles.noBorders}`}>
            <div>Wind Dir:</div>
            <div>{getWindDir(windDeg)}</div>
          </div>
        </div>
      </div>

      <div className={styles.detailsReport}>
        <div>
          {
            `Today - Sunny with a high of ${Math.round(maxTemp)} °F (${farenheitToCelcius(maxTemp)} °C). 
            Winds from ${getWindDir(windDeg)} at ${meterPerSecToMph(windSpeed)} to ${meterPerSecToMph(windSpeed)} mph 
            (${meterPerSecToKph(windSpeed)} to ${meterPerSecToKph(windSpeed)} kph).`
          }
        </div>
        <div>
          {
            `Tonight - Clear. Winds variable at ${meterPerSecToMph(windSpeed)} to ${meterPerSecToMph(windSpeed)} mph 
            (${meterPerSecToKph(windSpeed)} to ${meterPerSecToKph(windSpeed)} kph). 
            The overnight low will be ${Math.round(minTemp)} °F (${farenheitToCelcius(minTemp)} °C).`
          }
        </div>
      </div>
    </div>
  </GadgetContainer>
)

const mapStateToProps = state => ({
  feelsLike: state.currentWeatherData.main.feels_like,
  windSpeed: state.currentWeatherData.wind.speed,
  windDeg: state.currentWeatherData.wind.deg,
  humidity: state.currentWeatherData.wind.speed,
  visibility: state.currentWeatherData.visibility,
  maxTemp: state.currentWeatherData.main.temp_max,
  minTemp: state.currentWeatherData.main.temp_min,
  unitFC: state.unitFC,
  dt: state.currentWeatherData.dt,
  sunRise: state.currentWeatherData.sys.sunrise,
  sunSet: state.currentWeatherData.sys.sunset,
  weather: state.currentWeatherData.weather,
})

export default connect(mapStateToProps, null)(Details)
