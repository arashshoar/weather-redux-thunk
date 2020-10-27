import { call, put, take } from 'redux-saga/effects'

import { fetchLocations, fetchWeather } from 'utilities/utilitiesPart2'
import { getWholeData, setCoords, setLocationName, setMapData, setCurrentWeatherData, setForecastWeatherData } from 'actions/actions'
import { getLocationName, setCoordsOfLatitudeLongitude } from 'utilities/utilities'
import { CONST, KEYS } from 'utilities/constants'

import { getWholeDataSaga } from '../getWholeDataSaga'

jest.mock('utilities/utilitiesPart2', () => {

  const axiosMapData = require('utilities/test-utilities/mockData/commonJS/mapDataForAxios_CommonJS.js')
  const axiosCurrentWeatherData = require('utilities/test-utilities/mockData/commonJS/currentWeatherDataForAxios_CommonJS.js')
  const axiosForecastWeatherData = require('utilities/test-utilities/mockData/commonJS/forecastWeatherDataForAxios_ComonJS.js')

  return({
    fetchLocations: jest.fn()
      .mockImplementation(() => axiosMapData),
    fetchWeather: jest.fn()
      .mockImplementationOnce(() => axiosCurrentWeatherData.data)
      .mockImplementationOnce(() => axiosForecastWeatherData.data),
  })
})

describe('When we are testing the getWholeDataSaga', () => {
  const gen = getWholeDataSaga()
  const latLongObject = { type: CONST.GET_WHOLE_DATA, payload: { latitude: 37.3118288, longitude: -121.9770887 } }
  const mapData = require('utilities/test-utilities/mockData/commonJS/mapDataForAxios_CommonJS.js')
  const axiosCurrentWeatherData = require('utilities/test-utilities/mockData/commonJS/currentWeatherDataForAxios_CommonJS.js')
  const axiosForecastWeatherData = require('utilities/test-utilities/mockData/commonJS/forecastWeatherDataForAxios_ComonJS.js')

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next().value).toEqual(take(CONST.GET_WHOLE_DATA))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(getWholeData(37.3118288, -121.9770887)).value).toEqual(call(fetchLocations, { coords: '-121.9770887, 37.3118288' }))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(fetchLocations()).value).toEqual(put(setMapData(mapData.data)))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(setMapData(mapData.data)).value).toEqual(put(setLocationName(getLocationName(mapData.data))))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(setLocationName(getLocationName(mapData.data))).value).toEqual(call(fetchWeather, KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, 37.3118288, -121.9770887))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(fetchWeather()).value).toEqual(put(setCurrentWeatherData(axiosCurrentWeatherData.data)))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(setCurrentWeatherData(axiosCurrentWeatherData.data)).value).toEqual(call(fetchWeather, KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, 37.3118288, -121.9770887))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(fetchWeather()).value).toEqual(put(setForecastWeatherData(axiosForecastWeatherData.data)))
  })

  it('getWholeDataSaga is triggered when CONST.GET_WHOLE_DATA dispatched', () => {
    expect(gen.next(setForecastWeatherData(axiosForecastWeatherData.data)).value).toEqual(put(setCoords(`${-121.9770887},${37.3118288}`)))
  })
})
