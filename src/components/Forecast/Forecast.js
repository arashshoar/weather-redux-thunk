import React from 'react'
import { connect } from 'react-redux'

import { getTimeFromMilliSeconds, getWeatherIcon, getIfItIsDay, getTemp, getPrecipitationIcon, getHourAMPM, getDay } from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './Forecast.module.scss'

const renderForecastHours = (hourly, timeZone, sunRise, sunSet, unitFC) => (
  <div className={styles.table}>
    {
      hourly
        .map(
          hour => (
            <div className={`text-center ${styles.cell}`} key={hour.dt}>
              <div>{getHourAMPM(getTimeFromMilliSeconds(hour.dt, timeZone))}</div>
              <div><img alt={``} src={getWeatherIcon(hour.weather[0].description, getIfItIsDay(sunRise, sunSet, hour.dt))} /></div>
              <div>{getTemp(unitFC, hour.temp)}&deg;</div>
            </div>
          )
        )}
  </div>
)

const renderForecastDays = (daily, timeZone, unitFC) => (
  daily
    .map(
      day => (
        <div className={styles.forecastRow} key={day.dt}>
          <div className={styles.day}>{getDay(day.dt, timeZone)}</div>
          <div className={styles.icons}>
            <img alt={``} src={getWeatherIcon(day.weather[0].description, getIfItIsDay(day.sunrise, day.sunset, day.dt))} />
            <img alt={``} src={getPrecipitationIcon(day.weather[0].description)}/>
          </div>
          <div className={styles.maxMin}>
            <div>{getTemp(unitFC, day.temp.max)}&deg;</div>
            <div>{getTemp(unitFC, day.temp.min)}&deg;</div>
          </div>
        </div>
      )
    )
)

const Forecast = ({ hourly, daily, sunRise, sunSet, timeZone, unitFC }) => (
  <GadgetContainer cardTitle="Forecast" >
    <div className={styles.forecast}>
      <div className={styles.dropDown}>
        Temperature:
      </div>
      {renderForecastHours(hourly, timeZone, sunRise, sunSet, unitFC)}
      {renderForecastDays(daily, timeZone, unitFC)}
    </div>
  </GadgetContainer>
)

const mapStateToProps = state => ({
  hourly: state.forecastWeatherData.hourly,
  daily: state.forecastWeatherData.daily,
  timeZone: state.forecastWeatherData.timezone_offset,
  sunRise: state.forecastWeatherData.current.sunrise,
  sunSet: state.forecastWeatherData.current.sunset,
  unitFC: state.unitFC,
})

export default connect(mapStateToProps, null)(Forecast)
