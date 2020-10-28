import React from 'react'
import { Provider } from 'react-redux'
import storeForTests from 'store/createStoreForTests'

const RootForTests = ({ children, isSearchDone, cityName, countryName, currentWeatherData, mapData, unitFC, coords, forecastWeatherData, activeLogger }) => (
  <Provider store={storeForTests({ isSearchDone, cityName, countryName, currentWeatherData, mapData, unitFC, coords, forecastWeatherData, activeLogger })}>
    {children}
  </Provider>
)

export default RootForTests
