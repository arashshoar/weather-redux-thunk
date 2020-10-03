import { CONST } from 'utilities/constants'

const rootReducers = (state, action) => {
  switch (action.type) {
  case CONST.SET_COORDS:
    return {...state, coords: action.coords}
  case CONST.SET_LOCATION_NAME:
    return {...state, cityName: action.locationName.cityName, countryName: action.locationName.countryName}
  case CONST.SET_FOUND_LOCATIONS:
    return {...state, foundLocations: action.foundLocations}
  case CONST.SET_MAP_DATA:
    return {...state, mapData: action.mapData}
  case CONST.SET_CURRENT_WEATHER_DATA:
    return {...state, currentWeatherData: action.currentWeatherData}
  case CONST.SET_FORECAST_WEATHER_DATA:
    return {...state, forecastWeatherData: action.forecastWeatherData}
  default:
    return state
  }
}

export default rootReducers
