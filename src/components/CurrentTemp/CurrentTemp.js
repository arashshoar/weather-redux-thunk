import React from 'react'
import { connect } from 'react-redux'
import { getDateTimeFromMilSecs, getDesOfWeather } from 'utilities/utilities'
import { setunitFC } from 'actions/actions'

import LocationAndDate from './LocationAndDate/LocationAndDate'
import LocationList from './LocationList/LocationList'
import DescriptionAndTemp from './DescriptionAndTemp/DescriptionAndTemp'

import styles from './CurrentTemp.module.scss'

const CurrentTemp = ({ cityName, countryName, dt, weather, maxTemp, minTemp, currentTemp, unitFC, setunitFC }) => {
  const {time, date} = getDateTimeFromMilSecs(dt)
  const description = getDesOfWeather(weather)

  return (
    <div className={styles.currentTemp}>
      <div className={styles.tempHeader}>
        <LocationAndDate
          cityName={cityName}
          countryName={countryName}
          date={date}
          time={time}
        />
        <LocationList />
      </div>

      <DescriptionAndTemp
        unitFC={unitFC}
        setunitFC={setunitFC}
        description={description}
        maxTemp={maxTemp}
        minTemp={minTemp}
        currentTemp={currentTemp}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  unitFC:state.unitFC,
  cityName: state.cityName,
  countryName: state.countryName,
  currentTemp: state.currentWeatherData.main.temp,
  maxTemp: state.currentWeatherData.main.temp_max,
  minTemp: state.currentWeatherData.main.temp_min,
  dt: state.currentWeatherData.dt,
  weather: state.currentWeatherData.weather,
})

const mapDispatchToProps = dispatch => ({
  setunitFC: unitFC => dispatch(setunitFC(unitFC))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTemp)
