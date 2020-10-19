import React from 'react'
import { connect } from 'react-redux'
import { getDateFromMilSeconds, getDesOfWeather, getIfItIsDay, getTimeFromMilliSeconds } from 'utilities/utilities'
import { setUnitFC } from 'actions/actions'

import LocationAndDate from './LocationAndDate/LocationAndDate'
import LocationList from './LocationList/LocationList'
import DescriptionAndTemp from './DescriptionAndTemp/DescriptionAndTemp'

import styles from './CurrentTemp.module.scss'

const CurrentTemp = ({ cityName, countryName, dt, weather, maxTemp, minTemp, currentTemp, unitFC, setUnitFC, timeZone, sunRise, sunSet }) => {
  const date = getDateFromMilSeconds(dt, timeZone)
  const description = getDesOfWeather(weather)
  const placeTime = getTimeFromMilliSeconds(dt, timeZone)

  return (
    <div className={styles.currentTemp}>
      <div className={styles.tempHeader}>
        <LocationAndDate
          cityName={cityName}
          countryName={countryName}
          date={date}
          time={placeTime}
        />
        <LocationList />
      </div>

      <DescriptionAndTemp
        unitFC={unitFC}
        setUnitFC={setUnitFC}
        description={description}
        descriptionFirst={weather[0].description}
        isDay={getIfItIsDay(sunRise, sunSet, dt)}
        maxTemp={maxTemp}
        minTemp={minTemp}
        currentTemp={currentTemp}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  unitFC: state.unitFC,
  cityName: state.cityName,
  countryName: state.countryName,
  currentTemp: state.currentWeatherData.main.temp,
  maxTemp: state.currentWeatherData.main.temp_max,
  minTemp: state.currentWeatherData.main.temp_min,
  dt: state.currentWeatherData.dt,
  sunRise: state.currentWeatherData.sys.sunrise,
  sunSet: state.currentWeatherData.sys.sunset,
  timeZone: state.currentWeatherData.timezone,
  weather: state.currentWeatherData.weather,
})

const mapDispatchToProps = dispatch => ({
  setUnitFC: unitFC => dispatch(setUnitFC(unitFC))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTemp)
