import React from 'react'
import { connect } from 'react-redux'

import { getPrecipitationIcon } from 'utilities/utilities'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './Precipitation.module.scss'

export const increaseQuantityInHashTable = (hash, elem, rain) => {
  const hashTable = { ...hash }
  if(hashTable.maxCount < hashTable.hashData[elem] + 1) {
    hashTable.maxKey = elem
    hashTable.rain = rain
    hashTable.maxCount = hashTable.hashData[elem] + 1
  }
  hashTable.hashData[elem] += 1

  return hashTable
}

export const newElementForHashTable = (hash, elem, rain) => {
  const hashTable = { ...hash }
  if (!hashTable.maxCount) {
    hashTable.maxCount = 1
    hashTable.maxKey = elem
    hashTable.rain = rain
  }
  hashTable.hashData[elem] = 1

  return hashTable
}

export const getQuarterWeatherDescription = (from, hourly) => {
  let hash = {
    maxKey: undefined,
    rain: 0,
    maxCount: 0,
    hashData: {}
  }

  for (let i = from; i < from + 6; i++) {
    let desc = hourly[i] && hourly[i].weather[0] && hourly[i].weather[0].description
    let rain = hourly[i] && hourly[i].rain && hourly[i].rain['1h'] ? hourly[i].rain['1h'] : 0
    hash = hash.hashData[desc] ? { ...increaseQuantityInHashTable(hash, desc, rain) } : { ...newElementForHashTable(hash, desc, rain) }
  }

  return hash
}

export const getPrecipitationIconData = forecastWeatherData => {
  const result = {}
  const { hourly } = forecastWeatherData

  result.firstQuarterDesc = getQuarterWeatherDescription(0, hourly)
  result.secondQuarterDesc = getQuarterWeatherDescription(6, hourly)
  result.thirdQuarterDesc = getQuarterWeatherDescription(12, hourly)
  result.forthQuarterDesc = getQuarterWeatherDescription(18, hourly)

  return result
}

const Precipitation = ({ forecast }) => {
  const { firstQuarterDesc, secondQuarterDesc, thirdQuarterDesc, forthQuarterDesc } = getPrecipitationIconData(forecast)

  return (
    <GadgetContainer cardTitle="Precipitation">
      <div className={styles.precipitation}>

        <div className={styles.cell}>
          <div>Morning</div>
          <div><img alt={`${0}%`} src={getPrecipitationIcon(firstQuarterDesc.maxKey)} /></div>
          <div>{firstQuarterDesc.rain} mm</div>
        </div>

        <div className={styles.cell}>
          <div>Noon</div>
          <div><img alt={`${0}%`} src={getPrecipitationIcon(secondQuarterDesc.maxKey)} /></div>
          <div>{secondQuarterDesc.rain} mm</div>
        </div>

        <div className={styles.cell}>
          <div>Afternoon</div>
          <div><img alt={`${0}%`} src={getPrecipitationIcon(thirdQuarterDesc.maxKey)} /></div>
          <div>{thirdQuarterDesc.rain} mm</div>
        </div>

        <div className={styles.cell}>
          <div>Evening</div>
          <div><img alt={`${0}%`} src={getPrecipitationIcon(forthQuarterDesc.maxKey)} /></div>
          <div>{forthQuarterDesc.rain} mm</div>
        </div>

      </div>
    </GadgetContainer>
  )
}


const mapStateToProps = state => ({
  forecast: state.forecastWeatherData,
})

export default connect(mapStateToProps, null)(Precipitation)
