import { CONST } from 'utilities/constants'
import { storeStateIint } from 'utilities/test-utilities/mockData/storeStateInit'

const rootReducers = (state = storeStateIint, action) => {

  switch (action.type) {
    case CONST.SET_COORDS:
      return { ...state, coords: action.coords }
    case CONST.SET_LOCATION_NAME:
      return { ...state, cityName: action.locationName.cityName, countryName: action.locationName.countryName }
    case CONST.SET_MAP_DATA:
      return { ...state, mapData: action.mapData }
    case CONST.SET_CURRENT_WEATHER_DATA:
      return { ...state, currentWeatherData: action.currentWeatherData }
    case CONST.SET_FORECAST_WEATHER_DATA:
      return { ...state, forecastWeatherData: action.forecastWeatherData }
    case CONST.SET_IS_SEARCH_DONE:
      return { ...state, isSearchDone: action.isSearchDone }
    case CONST.SET_UNIT_CF:
      return { ...state, unitFC: action.unitFC }
    default:
      return state
  }
}

export default rootReducers
