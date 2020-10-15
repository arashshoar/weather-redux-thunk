import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducers from 'reducers/rootReducers'
import { currentWeatherDataForAxios } from 'utilities/test-utilities/mockData/currentWeatherDataForAxios'
import { mapDataForAxios } from 'utilities/test-utilities/mockData/mapDataForAxios'
import { forecastWeatherDataForAxios } from 'utilities/test-utilities/mockData/forecastWeatherDataForAxios'

const storeForTests = (
  {
    isSearchDone = false,
    cityName = 'New York',
    countryName = 'United States',
    currentWeatherData = currentWeatherDataForAxios.data,
    mapData = mapDataForAxios.data,
    unitFC = 'f',
    coords = '-100, 50',
    forecastWeatherData = forecastWeatherDataForAxios.data,
    activeLogger = true
  } = {}) => {

  const enhancer = composeWithDevTools(
    process.env.NODE_ENV === 'test' && activeLogger ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
  )

  return createStore(rootReducers, {isSearchDone, cityName, countryName , currentWeatherData, mapData, unitFC, coords, forecastWeatherData}, enhancer )
}

export default storeForTests
