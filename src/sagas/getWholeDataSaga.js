import { call, put, take } from 'redux-saga/effects'

import { fetchLocations, fetchWeather } from '../utilities/utilitiesPart2'
import { setCoords, setLocationName, setMapData, setCurrentWeatherData, setForecastWeatherData } from '../actions/actions'
import { getLocationName, setCoordsOfLatitudeLongitude } from 'utilities/utilities'
import { CONST, KEYS } from 'utilities/constants'

export function* getWholeDataSaga() {

  while (true) {
    const { payload: { latitude, longitude } } = yield take(CONST.GET_WHOLE_DATA)
    const { data: mapData } = yield call(() => fetchLocations({ coords: setCoordsOfLatitudeLongitude(latitude, longitude) }))
    yield put(setMapData(mapData))
    yield put(setLocationName(getLocationName(mapData)))
    const currentWeatherData = yield call(() => fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, latitude, longitude))
    yield put(setCurrentWeatherData(currentWeatherData))
    const forecastWeatherData = yield call(() => fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, latitude, longitude))
    yield put(setForecastWeatherData(forecastWeatherData))
    yield put(setCoords(`${longitude},${latitude}`))
  }
}
