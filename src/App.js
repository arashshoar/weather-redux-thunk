import React from 'react'
import { connect } from 'react-redux'
import CurrentTemp from 'components/CurrentTemp/CurrentTemp'

import { getUsersLocation } from 'actions/getUsersLocation'
import { getBackgroundsSrc } from 'utilities/utilities'

import Wind from 'components/Wind/Wind'
import SunMoon from 'components/SunMoon/SunMoon'
import Details from 'components/Details/Details'
import Precipitation from 'components/Precipitation/Precipitation'
import Forecast from 'components/Forecast/Forecast'

import styles from './App.module.scss'
import GoogleMap from "./components/GoogleMap/GoogleMap";

const App = ({ getUsersLocation }) => {

  React.useEffect(() => {
    getUsersLocation()
    const backgroundImage = getBackgroundsSrc()
    console.log("++++++||||||", backgroundImage)
    document.body.style.backgroundImage = `url(${backgroundImage})`
    document.body.style.backgroundAttachment = 'fixed'
    // document.body.style.backgroundSize = 'cover'
  })

  return (
    <div className={styles.app} >
      <div className={styles.asideContainer}>

      </div>
      <div className={styles.currentTempContainer}>
        <CurrentTemp />
      </div>
      <div className={styles.links}></div>
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
