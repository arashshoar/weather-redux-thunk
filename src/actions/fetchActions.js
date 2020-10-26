import axios from 'axios'
import {
  getFreshWeatherData,
  getStoredData,
  getUrl,
  roundCoords,
} from '../utilities/utilities'

export const fetchLocations = async ({ coords, locationName }) => {
  const storedLocationData = coords && JSON.parse(window.localStorage.getItem('storedLocationData' + roundCoords(coords)) && null)

  const axiosTypeMapData =  storedLocationData
    ? storedLocationData
    : axios.get(getUrl({
      name: coords ? 'coordsQuery' : 'locationNameQuery',
      token: process.env.REACT_APP_TOKEN,
      locationName,
      coords
    }))

  if (coords) {
    window.localStorage.setItem('storedLocationData' + roundCoords(coords), JSON.stringify(axiosTypeMapData))
  }

  return axiosTypeMapData
}

export const fetchWeather = async (weatherQueryKey, storeKey, latitude, longitude) => {

  const weatherData = getStoredData(storeKey, latitude, longitude)
    ? getStoredData(storeKey, latitude, longitude)
    : await getFreshWeatherData(weatherQueryKey, storeKey, latitude, longitude)

  return weatherData
}

