import React from 'react'
import { connect } from 'react-redux'

import { initMapFunctionString, removeOldScriptElement } from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './GoogleMap.module.scss'

const loadScriptInintMap = ({ lat, lng }) => {
  removeOldScriptElement('googleMapFunction')
  const script = document.createElement('script')
  const rootElement = document.getElementById('root')

  script.innerHTML = initMapFunctionString({ lat, lng })
  script.setAttribute('id', 'googleMapFunction')
  if (document.getElementById('googleMapScript')) {
    document.getElementById('googleMapScript').before(script)
  } else {
    rootElement.append(script)
  }

}

const loadScript = () => {
  removeOldScriptElement('googleMapScript')
  const script = document.createElement('script')
  const rootElement = document.getElementById('root')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP}&callback=initMap`
  script.setAttribute('id', 'googleMapScript')
  script.setAttribute('defer', 'true')
  rootElement.append(script)
}

const GoogleMap = ({ lat, lng }) => {
  React.useEffect(() => {
    if (lat && lng) {
      loadScriptInintMap({ lat, lng })
      loadScript()
    }
  }, [lat, lng])

  return (
    <GadgetContainer cardTitle="Map">
      <div id="map" className={styles.googleMap}></div>
    </GadgetContainer>
  )
}

const mapStateToProps = state => ({
  lat: state.coords.split(',')[1],
  lng: state.coords.split(',')[0],
})

export default connect(mapStateToProps, null)(GoogleMap)
