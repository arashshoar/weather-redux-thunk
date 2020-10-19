import React from 'react'
import { connect } from 'react-redux'

import { getPrecipitation } from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './Precipitation.module.scss'

const Precipitation = ({ forecast }) => {

  return (
    <GadgetContainer cardTitle="Precipitation">
      <div className={styles.precipitation}>

        <div className={styles.cell}>
          <div>Morning</div>
          <div><img alt={`${0}%`} src={getPrecipitation(0)} /></div>
          <div>{0}%</div>
        </div>

        <div className={styles.cell}>
          <div>Noon</div>
          <div><img alt={`${0}%`} src={getPrecipitation(0)} /></div>
          <div>{0}%</div>
        </div>

        <div className={styles.cell}>
          <div>Afternoon</div>
          <div><img alt={`${0}%`} src={getPrecipitation(0)} /></div>
          <div>{0}%</div>
        </div>

        <div className={styles.cell}>
          <div>Evening</div>
          <div><img alt={`${0}%`} src={getPrecipitation(0)} /></div>
          <div>{0}%</div>
        </div>

      </div>
    </GadgetContainer>
  )
}


const mapStateToProps = state => ({
  forecast: state.forecastWeatherData,
})

export default connect(mapStateToProps, null)(Precipitation)
