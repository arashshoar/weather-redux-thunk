import { CONST } from 'utilities/constants'

export const getUsersLocation = () => ({
  type: CONST.GET_USERS_LOCATION,
})

export const checkForStoredUnit = () => ({
  type: CONST.CHECK_FOR_STORE_UNIT,
})

export const getWholeData = (latitude, longitude) => ({
  type: CONST.GET_WHOLE_DATA,
  payload: { latitude, longitude }
})

export const setCoords = coords => ({
  type: CONST.SET_COORDS,
  coords,
})

export const setLocationName = locationName => ({
  type: CONST.SET_LOCATION_NAME,
  locationName,
})

export const setMapData = mapData => ({
  type: CONST.SET_MAP_DATA,
  mapData,
})

export const setCurrentWeatherData = (currentWeatherData) => ({
  type: CONST.SET_CURRENT_WEATHER_DATA,
  currentWeatherData,
})

export const setForecastWeatherData = (forecastWeatherData) => ({
  type: CONST.SET_FORECAST_WEATHER_DATA,
  forecastWeatherData,
})

export const setIsSearchDone = isSearchDone => ({
  type: CONST.SET_IS_SEARCH_DONE,
  isSearchDone,
})

export const setUnitFC = unitFC => ({
  type: CONST.SET_UNIT_CF,
  unitFC
})
