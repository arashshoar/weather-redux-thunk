import React from 'react'
import { connect } from 'react-redux'
import CurrentTemp from 'components/CurrentTemp/CurrentTemp'

import { getUsersLocation } from 'actions/actions'
import { getApplicationBackground } from 'utilities/utilities'

import Wind from 'components/Wind/Wind'
import SunMoon from 'components/SunMoon/SunMoon'
import Details from 'components/Details/Details'
import Precipitation from 'components/Precipitation/Precipitation'
import Forecast from 'components/Forecast/Forecast'
import GoogleMap from 'components/GoogleMap/GoogleMap'
import Advertisement from 'components/Advertisement/Advertisement'
import Aside from 'components/Aside/Aside'


import styles from './App.module.scss'
import AdvertisementSecondary from './components/AdvertisementSecondary/AdvertisementSecondary'

const App = ({ getUsersLocation }) => {

  React.useEffect(() => {
    getUsersLocation()
    getApplicationBackground()
  })

  return (
    <div className={styles.app} >
      <div className={styles.asideContainer}>
        <Aside />
      </div>
      <div className={styles.currentTempContainer}>
        <CurrentTemp />
      </div>
      <div className={styles.links}>
        <Advertisement />
      </div>
      <div className={styles.addSecondary}>
        <AdvertisementSecondary />
      </div>
      <div className={styles.componentsSetOne}>
        <Wind />
        <Details />
        <GoogleMap />
      </div>
      <div className={styles.componentsSetTwo}>
        <SunMoon />
        <Precipitation />
        <Forecast />
      </div>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUsersLocation: () => dispatch(getUsersLocation()),
  }
}

export default connect(null, mapDispatchToProps)(App)
