import React from 'react'
import { connect } from 'react-redux'
import { getUsersLocation } from 'actions/actions'
import CurrentTemp from 'components/CurrentTemp/CurrentTemp'
import { backgroundSrcSets } from 'utilities/backgroundPathes'
import { getBackgroundsSrc } from 'utilities/utilities'

import styles from './App.module.scss'

const App = ({ getUsersLocation }) => {

  React.useEffect(() => {
    getUsersLocation()
    document.body.style.backgroundImage = `url(${getBackgroundsSrc(backgroundSrcSets)})`
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
