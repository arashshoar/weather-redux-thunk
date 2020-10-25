import { call, put, take, takeEvery } from 'redux-saga/effects'

import { fetchLocations, fetchWeather } from './fetchActions'
import { setCoords, setLocationName, getWholeData, setMapData } from './actions'
import { getLocationName, roundCoords, setCoordsOfLatitudeLongitude } from 'utilities/utilities'
import { CONST, KEYS } from 'utilities/constants'

// export const getWholeData = (latitude, longitude) => {
//
//   return async dispatch => {
//
//     const mapData = await dispatch(fetchLocations({ coords: `${longitude},${latitude}` }))
//     dispatch(setLocationName(getLocationName(mapData)))
//     dispatch(fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, latitude, longitude))
//     dispatch(fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, latitude, longitude))
//     dispatch(setCoords(`${longitude},${latitude}`))
//   }
// }

export function* getWholeDataSaga() {
  // const mapData = await dispatch(fetchLocations({ coords: `${longitude},${latitude}` }))
  console.log('I am in saga')
  const { payload: { latitude, longitude } } = yield take(CONST.GET_WHOLE_DATA)
  // const latLng = yield take(CONST.GET_WHOLE_DATA)
  console.log('lat and Lng', latitude, longitude)
  const { data: mapData } = yield call(() => fetchLocations({ coords: setCoordsOfLatitudeLongitude(latitude, longitude) }))
  console.log('mapData Arash :', mapData)
  window.localStorage.setItem('storedLocationData' + roundCoords(setCoordsOfLatitudeLongitude(latitude, longitude)), JSON.stringify(mapData))
  yield put(setMapData(mapData))
  console.log('going for location', mapData)
  yield put(setLocationName(getLocationName(mapData)))
  yield put(fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, latitude, longitude))
  yield put(fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, latitude, longitude))
  yield put(setCoords(`${longitude},${latitude}`))

}
