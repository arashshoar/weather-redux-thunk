import { fetchLocations, fetchWeather } from './fetchActions'
import { setCoords, setLocationName } from './actions'
import { getLocationName } from 'utilities/utilities'
import { KEYS } from 'utilities/constants'

export const getWholeData = (latitude, longitude) => {

  return async dispatch => {

    const mapData = await dispatch(fetchLocations({coords: `${longitude},${latitude}`}))
    dispatch(setLocationName(getLocationName(mapData)))
    dispatch(fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, latitude, longitude))
    dispatch(fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, latitude, longitude))
    dispatch(setCoords(`${longitude},${latitude}`))
  }
}
