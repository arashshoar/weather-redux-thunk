import axios from 'axios'
import { getFreshWeatherData, getStoredData, getUrl, roundCoords } from '../utilities/utilities'
import { setCurrentWeatherData, setForecastWeatherData, setMapData } from './actions'

export const fetchLocations = ({ coords, locationName }) => {

  return async dispatch => {

    try {
      const storedLocationData = coords && JSON.parse(window.localStorage.getItem('storedLocationData' + roundCoords(coords)))

      const data = storedLocationData
        ? storedLocationData
        : await axios.get(getUrl({
          name: coords ? 'coordsQuery' : 'locationNameQuery',
          token: process.env.REACT_APP_TOKEN,
          locationName,
          coords
        }))

      if (coords) {
        window.localStorage.setItem('storedLocationData' + roundCoords(coords), JSON.stringify(data))
      }
      const {data: mapData} = data

      dispatch(setMapData(mapData))

      return mapData
    } catch (error) {
      console.log('Location Error:', error)
    }
  }
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
