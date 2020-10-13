import { CONST } from 'utilities/constants'

export const setCoords = coords => ({
  type: CONST.SET_COORDS,
  coords,
})

export const setLocationName = locationName => ({
  type: CONST.SET_LOCATION_NAME,
  locationName,
})

export const setFoundLocations = foundLocations => ({
  type: CONST.SET_FOUND_LOCATIONS,
  foundLocations,
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
