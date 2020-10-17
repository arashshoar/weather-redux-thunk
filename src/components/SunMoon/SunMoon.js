import React from 'react'
import { connect } from 'react-redux'

import { getDayHours, getTimeFromMilliSeconds, getQuarter } from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'
import SunLocation from './SunLocation'
import MoonIcon from './MoonIcon'

import styles from './SunMoon.module.scss'

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
