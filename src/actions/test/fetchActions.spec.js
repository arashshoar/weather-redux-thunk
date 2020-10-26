import { fetchLocations, fetchWeather } from '../../utilities/utilitiesPart2'
import { getUrl } from 'utilities/utilities'
import { setMapData, setCurrentWeatherData, setForecastWeatherData } from '../actions'

jest.mock('axios', () => {

  const mapDataForAxios = require('utilities/test-utilities/mockData/commonJS/mapDataForAxios_CommonJS.js')
  const currentWeatherDataForAxios = require('utilities/test-utilities/mockData/commonJS/currentWeatherDataForAxios_CommonJS')
  const forecastWeatherDataForAxios = require('utilities/test-utilities/mockData/commonJS/forecastWeatherDataForAxios_ComonJS')

  const getAxiosMockImplementation = () => {
    const dataArr = [mapDataForAxios, mapDataForAxios, currentWeatherDataForAxios, forecastWeatherDataForAxios]
    const result = jest.fn()

    for (let data of dataArr) {
      let callBack = () => Promise.resolve(data)
      result['mockImplementationOnce'](callBack)
    }

    return result
  }

  return ({
    get: getAxiosMockImplementation()
  })
})

const mapDataMock = require('utilities/test-utilities/mockData/commonJS/mapDataForAxios_CommonJS.js')
const currentWeatherDataMock = require('utilities/test-utilities/mockData/commonJS/currentWeatherDataForAxios_CommonJS')
const forecastWeatherDataForMock = require('utilities/test-utilities/mockData/commonJS/forecastWeatherDataForAxios_ComonJS')

jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')

  return {
    ...rest,
    getUrl: jest.fn(() => 'http;//sample.com')
  }

})

jest.mock('../actions', () => ({
  setLocationName: jest.fn(),
  setMapData: jest.fn(),
  setCurrentWeatherData: jest.fn(),
  setForecastWeatherData: jest.fn()
}))

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing fetchLocations function', () => {
  it('if we call it with coordinates it sets location and mapData ',  async () => {

    fetchLocations({ coords: '12, 4' })(jest.fn())
    await flushPromise()

    expect(getUrl).toHaveBeenCalled()
    expect(getUrl).toHaveBeenCalledWith(expect.objectContaining({
      coords: '12, 4'
    }))
    expect(setMapData).toHaveBeenCalledWith(mapDataMock.data)
  })


  it('if we call it without coordinates it sets location and mapData base on location query ',  async () => {
    jest.clearAllMocks()

    fetchLocations({ coords: undefined, locationName: 'New Yore' })(jest.fn())
    await flushPromise()

    expect(getUrl).toHaveBeenCalled()
    expect(getUrl).toHaveBeenCalledWith(expect.objectContaining({
      locationName: 'New Yore'
    }))
    expect(setMapData).toHaveBeenCalledWith(mapDataMock.data)
  })

})

describe('When we are testing fetchWeather function', () => {

  it('When if we call it with weatherQueryCurrent, it should feed currentWeatherData to store', async () => {
    fetchWeather('weatherQueryCurrent', 'storedCurrentWeatherData', '12', '4')(jest.fn())
    await flushPromise()
    expect(setCurrentWeatherData).toHaveBeenCalledWith(currentWeatherDataMock.data)
  })

  it('When if we call it with weatherQueryCurrent, it should feed currentWeatherData to store', async () => {
    fetchWeather('weatherQueryForecast', 'storedForecastWeatherData', '12', '4')(jest.fn())
    await flushPromise()
    expect(setForecastWeatherData).toHaveBeenCalledWith(forecastWeatherDataForMock.data)
  })
})
