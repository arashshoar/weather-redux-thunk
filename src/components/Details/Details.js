import React from 'react'
import { connect } from 'react-redux'

import {
  getTemp,
  getWindDir,
  farenheitToCelcius,
  meterPerSecToMph,
  meterPerSecToKph,
  meterToMiles
} from 'utilities/utilities'
import { SRC } from 'utilities/constants'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './Details.module.scss'

const Details = ({ feelsLike, humidity, visibility, maxTemp, minTemp, windSpeed, windDeg, unitFC }) => {

  return (
    <GadgetContainer cardTitle="Details">
      <div className={styles.details}>
        <div className={`row ${styles.borderBottom}`}>
          <div className={`col-3 col-sm-4 ${styles.detailsIconContainer}`}>
            <img alt="Status" src={SRC.clearDayIcon} className={styles.detailsIcon} />
          </div>
          <div className={`row col-9 col-sm-8 ${styles.detailsTable}`}>
            <div className="col-6 text-left">Feels like:</div>
            <div className="col-6 text-right">{`${getTemp(unitFC, feelsLike)}`}&deg;</div>
            <div className="col-6 text-left">humidity:</div>
            <div className="col-6 text-right">{humidity}%</div>
            <div className="col-6 text-left">visibility:</div>
            <div className="col-6 text-right">{meterToMiles(visibility)} miles</div>
            <div className={`col-6 text-left ${styles.noBorders}`}>Wind Dir:</div>
            <div className={`col-6 text-right ${styles.noBorders}`}>{getWindDir(windDeg)}</div>
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
}

const mapStateToProps = state => ({
  feelsLike: state.currentWeatherData.main.feels_like,
  windSpeed: state.currentWeatherData.wind.speed,
  windDeg: state.currentWeatherData.wind.deg,
  humidity: state.currentWeatherData.wind.speed,
  visibility: state.currentWeatherData.visibility,
  maxTemp: state.currentWeatherData.main.temp_max,
  minTemp: state.currentWeatherData.main.temp_min,
  unitFC: state.unitFC,
})

export default connect(mapStateToProps, null)(Details)
