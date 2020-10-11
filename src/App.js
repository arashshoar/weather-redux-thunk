import React from 'react'
import { connect } from 'react-redux'
import CurrentTemp from 'components/CurrentTemp/CurrentTemp'
import { getBackgroundsSrc } from 'utilities/utilities'

import styles from './App.module.scss'
import {getUsersLocation} from "./actions/getUsersLocation";

const App = ({ getUsersLocation }) => {

  React.useEffect(() => {
    getUsersLocation()
    const backgroundImage = getBackgroundsSrc()
    console.log("++++++||||||", backgroundImage)
    document.body.style.backgroundImage = `url(${backgroundImage})`
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
        <button onClick={getUsersLocation}>Fetch</button>
      </div>
      <div className={styles.componentsSetTwo}></div>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUsersLocation: () => dispatch(getUsersLocation()),
  }
}

export default connect(null, mapDispatchToProps)(App)
