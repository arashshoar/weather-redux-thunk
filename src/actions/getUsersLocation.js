import { someCityCoords } from '../utilities/constants'
import { getUserCurrentPosition } from 'utilities/utilities'
import { setCoords } from './actions'
import { fetchLocations, fetchWeather } from './fetchActions'

export const getUsersLocation = () => {

  return async dispatch => {

    try {
      const {coords: {latitude, longitude}} = await getUserCurrentPosition()
      dispatch(fetchLocations({coords: `${longitude},${latitude}`}))
      dispatch(fetchWeather('weatherQueryCurrent', 'storedCurrentWeatherData', latitude, longitude))
      dispatch(fetchWeather('weatherQueryForecast', 'storedForecastWeatherData', latitude, longitude))
      dispatch(setCoords(`${longitude},${latitude}`))
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message)
      dispatch(fetchLocations({coords: someCityCoords.NewYork}))
      dispatch(fetchWeather('weatherQueryCurrent', 'storedCurrentWeatherData', '40.7648', '-73.9808'))
      dispatch(fetchWeather('weatherQueryForecast', 'storedForecastWeatherData', '40.7648', '-73.9808'))
      dispatch(setCoords(someCityCoords.NewYork))
    }
  }
}

