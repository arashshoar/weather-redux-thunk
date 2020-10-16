import React from 'react'
import { connect } from 'react-redux'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'
import WindGen from './WindGen/WindGen'

import styles from './Wind.module.scss'

const Wind = ({ windSpeed, pressure, windDegree }) => {

  return (
    <GadgetContainer cardTitle="Wind & Pressure">
      <div className={`${styles.windContainer} clearfix`}>
        <div className={`${styles.items}`}>
          <div className={styles.bigGen}>
            <WindGen />
          </div>
          <div className={styles.smallGen}>
            <WindGen small/>
          </div>
          <div className={styles.wind}>
            <div>Wind</div>
            <div>{`${windSpeed ? windSpeed : 'loading'} mph`}</div>
          </div>
          <div className={styles.pressure}>
            <div>Barometer</div>
            <div>{`${pressure ? pressure : 'loading'} inches`}</div>
          </div>
        </div>
        <div className={styles.border}></div>
      </div>
    </GadgetContainer>
  )
}


const mapStateToProps = state => ({
  windSpeed: state.currentWeatherData.wind.speed,
  pressure: state.currentWeatherData.main.pressure,
})

export default connect(mapStateToProps, null)(Wind)
