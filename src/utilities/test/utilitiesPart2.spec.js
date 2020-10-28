import { localStorageMock } from 'test-utilities/mocks'
import { fetchLocations, fetchWeather } from '../utilitiesPart2'
import { roundCoords } from '../utilities'
import { KEYS } from '../constants'

jest.mock('axios', () => {
  const rest = jest.requireActual('axios')

  return ({
    ...rest,
    get: jest.fn().mockImplementation(() => ({ data: {} }))
  })
})

const flushPromise = () => new Promise(resolve => setTimeout(resolve, 0))

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock()
})

describe('When we are testing the fetchLocations function', () => {

  it('should returns a Promise', async () => {
    const returnValue = fetchLocations({ coords: '-100, 50' })
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: {} }))
  })

  it('should returns a Promise even if we have a stored location on local storage', async () => {
    window.localStorage.setItem('storedLocationData' + roundCoords('-120,40'), JSON.stringify(
      { data: { value: "stored" } }
    ))

    const returnValue = fetchLocations({ coords: '-120,40' })
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: { value: 'stored' } }))
  })

  it('should returns a Promise even if input is location name', async () => {
    const returnValue = fetchLocations({ locationName: 'New York' })
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: {} }))
  })
})

describe('When we are testing fetchWeather', () => {

  it('should returns a Promise when it is used for Current Weather Data', async () => {
    const returnValue = fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, '40', '-120')
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: {} }))
  })

  it('should returns a Promise when it is used for Current Weather Data from local storage', async () => {
    window.localStorage.setItem(KEYS.storedCurrentWeatherData + 'Time' + '40' + '-120', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem(KEYS.storedCurrentWeatherData + '40' + '-120', JSON.stringify({ data: { weather: 'Stored Current Weather' } }))
    const returnValue = fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, '40', '-120')
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: { weather: 'Stored Current Weather' } }))
  })

  it('should returns a Promise when it is used for Current Weather Data', async () => {
    const returnValue = fetchWeather(KEYS.weatherQueryCurrent, KEYS.storedCurrentWeatherData, '40', '-120')
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: {} }))
  })

  it('should returns a Promise when it is used for Current Weather Data from local storage', async () => {
    window.localStorage.setItem(KEYS.storedForecastWeatherData + 'Time' + '40' + '-120', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem(KEYS.storedForecastWeatherData + '40' + '-120', JSON.stringify({ data: { weather: 'Stored Forecast Weather' } }))
    const returnValue = fetchWeather(KEYS.weatherQueryForecast, KEYS.storedForecastWeatherData, '40', '-120')
    await flushPromise()
    expect(returnValue).toEqual(Promise.resolve({ data: { weather: 'Stored Forecast Weather' } }))
  })
})
