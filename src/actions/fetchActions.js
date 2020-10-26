import axios from 'axios'
import { getFreshWeatherData, getStoredData, getUrl, roundCoords } from '../utilities/utilities'
import { setCurrentWeatherData, setForecastWeatherData } from './actions'

export const fetchLocations = async ({ coords, locationName }) => {

  const storedLocationData = coords && JSON.parse(window.localStorage.getItem('storedLocationData' + roundCoords(coords)) && null)

  return storedLocationData
    ? storedLocationData
    : axios.get(getUrl({
      name: coords ? 'coordsQuery' : 'locationNameQuery',
      token: process.env.REACT_APP_TOKEN,
      locationName,
      coords
    }))
}

export const fetchWeather = (weatherQueryKey, storeKey, latitude, longitude) => {

  return async dispatch => {

    const weatherData = getStoredData(storeKey, latitude, longitude)
      ? getStoredData(storeKey, latitude, longitude)
      : await getFreshWeatherData(weatherQueryKey, storeKey, latitude, longitude)

    if (weatherQueryKey === 'weatherQueryCurrent') {
      dispatch(setCurrentWeatherData(weatherData))
    } else {
      dispatch(setForecastWeatherData(weatherData))
    }
  }
}
