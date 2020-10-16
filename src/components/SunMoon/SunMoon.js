import React from 'react'
import { connect } from 'react-redux'

import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'
import SunLocation from './SunLocation'
import MoonIcon from './MoonIcon'

import styles from './SunMoon.module.scss'

const getDayHours = (sunRise, sunSet) => {
  const hours = Math.round(((sunSet + '000') - (sunRise + '000')) / 360000) / 10

  return isNaN(hours) ? 'Loading' : hours
}

const getTimeFromMilliSeconds = (milli, timeZoon) => {
  if (!milli) {
    return 'loading'
  }
  const date = new Date(Number(milli + '000') + Number(timeZoon + '000'))
  const time = date.toISOString().split('T')[1].split(':')
  return time[0] + ':' + time[1]
}

const getQuarter = ({ sunRise, sunSet, dt }) => {
  const sunRiseMilliSeconds = Number(sunRise + '000')
  const sunSetMilliSeconds = Number(sunSet + '000')
  const currentMilliSeconds = Number(dt + '000')
  const dayQuarter = (sunRiseMilliSeconds - currentMilliSeconds) / (sunRiseMilliSeconds - sunSetMilliSeconds)

  return Math.round(dayQuarter * 100) / 100
}

const SunMoon = ({ sunRise, sunSet, dt, timeZone }) => {
  const dayQuarter = getQuarter({ sunRise, sunSet, dt })
  const baseMoveToLeft = dayQuarter * 200 

  return (
    <GadgetContainer cardTitle="Sun & Moon">
      <div className={`${styles.sunMoon} clearfix`}>
        {
          dayQuarter < 1 && dayQuarter > 0
            ? <SunLocation sunRise={getTimeFromMilliSeconds(sunRise, timeZone)} sunSet={getTimeFromMilliSeconds(sunSet, timeZone)} baseMoveToLeft={baseMoveToLeft} />
            : <MoonIcon />
        }
        <div className={styles.tableContainer}>
          <div>Sun Rise: {getTimeFromMilliSeconds(sunRise, timeZone)}</div>
          <div>Sun Set: {getTimeFromMilliSeconds(sunSet, timeZone)}</div>
          <div>Sun Hours: {getDayHours(sunRise, sunSet)}</div>
        </div>
      </div>
    </GadgetContainer>
  )
}

const mapStateToProps = state => ({
  sunRise: state.currentWeatherData.sys.sunrise,
  sunSet: state.currentWeatherData.sys.sunset,
  dt: state.currentWeatherData.dt,
  timeZone: state.currentWeatherData.timezone,
})

export default connect(mapStateToProps, null)(SunMoon)
