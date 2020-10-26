import { call, put, take } from 'redux-saga/effects'

import { fetchLocations, fetchWeather } from './fetchActions'
import { setCoords, setLocationName, setMapData } from './actions'
import { getLocationName, roundCoords, setCoordsOfLatitudeLongitude } from 'utilities/utilities'
import { CONST, KEYS } from 'utilities/constants'

export function* getWholeDataSaga() {

  while (true) {
    const { payload: { latitude, longitude } } = yield take(CONST.GET_WHOLE_DATA)
    const { data: mapData } = yield call(() => fetchLocations({ coords: setCoordsOfLatitudeLongitude(latitude, longitude) }))
    window.localStorage.setItem('storedLocationData' + roundCoords(setCoordsOfLatitudeLongitude(latitude, longitude)), JSON.stringify(mapData))
    yield put(setMapData(mapData))
    yield put(setLocationName(getLocationName(mapData)))
    yield put(fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, latitude, longitude))
    yield put(fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, latitude, longitude))
    yield put(setCoords(`${longitude},${latitude}`))
  }
}
