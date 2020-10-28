import axios from 'axios'
import {
  getFreshWeatherData,
  getStoredData,
  getUrl,
  roundCoords,
} from './utilities'

export const fetchLocations = async ({ coords, locationName }) => {
  const storedLocationData = coords && JSON.parse(window.localStorage.getItem('storedLocationData' + roundCoords(coords)))

  const axiosTypeMapData = storedLocationData
    ? storedLocationData
    : await axios.get(getUrl({
      name: coords ? 'coordsQuery' : 'locationNameQuery',
      token: process.env.REACT_APP_TOKEN,
      locationName,
      coords
    }))

  if (coords) {
    window.localStorage.setItem('storedLocationData' + roundCoords(coords), JSON.stringify(axiosTypeMapData))
  }

  return Promise.resolve(axiosTypeMapData)
}

export const fetchWeather = (weatherQueryKey, storeKey, latitude, longitude) => {

  const weatherData = getStoredData(storeKey, latitude, longitude)
    ? getStoredData(storeKey, latitude, longitude)
    : getFreshWeatherData(weatherQueryKey, storeKey, latitude, longitude)

  return Promise.resolve(weatherData)
}

