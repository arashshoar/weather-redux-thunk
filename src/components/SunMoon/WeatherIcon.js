import React from 'react'
import styles from './SunMoon.module.scss'
import { getWeatherIcon, getIfItIsDay } from 'utilities/utilities'

const WeatherIcon = ({ sunRise, sunSet, dt, description }) => (
  <div className={styles.moonIconContainer}>
    <div className={styles.svgContainer}>
      <img src={getWeatherIcon({ description, isDay: getIfItIsDay(sunRise, sunSet, dt) })} alt="" />
    </div>
  </div>
)

export default WeatherIcon
