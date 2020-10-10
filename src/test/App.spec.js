import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Root from 'Root'
import App from 'App'
import * as mockAxios from 'axios'

import { localStorageMock, geolocationMock } from 'test-utilities/mocks'
import { someCityCoords } from 'utilities/constants'
import { currentWeatherDataForAxios } from 'utilities/test-utilities/mockData/currentWeatherDataForAxios'
import { mapDataForAxios } from 'utilities/test-utilities/mockData/mapDataForAxios'
import { forecastWeatherDataForAxios } from 'utilities/test-utilities/mockData/forecastWeatherDataForAxios'

global.navigator.geolocation = geolocationMock

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})

const getAxiosMockImplementation = () => jest.fn()
  .mockImplementationOnce(() => Promise.resolve(mapDataForAxios))
  .mockImplementationOnce(() => Promise.resolve(currentWeatherDataForAxios))
  .mockImplementationOnce(() => Promise.resolve(forecastWeatherDataForAxios))

mockAxios.get = jest.fn()


function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing App component', () => {
  let wrapper

  const getStore = App => App.find('Provider').prop('store').getState()

  wrapper = () => mount(<Root><App/></Root>)

  beforeEach(() => {
    mockAxios.get.mockReset()
    mockAxios.get = getAxiosMockImplementation()
  })

  it('Should run the test file', () => {
    expect(App).toBeDefined()
  })

  it('Wrapper should have one child and when user denied application to get their location it should have New York as location', async () => {
    await flushPromise()
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).coords).toMatch(someCityCoords.NewYork)
    expect(App).toHaveLength(1)
  })

  it('When user let application to get their location it should have San Jose as location', async () => {
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).coords).toMatch(someCityCoords.SanJose)
  })

  it('When we have weather data on localStorage it use the local storage data but map data has damaged stored data', async () => {
    window.localStorage.setItem('storedLocationData-121.98,37.31', {})
    window.localStorage.setItem('storedCurrentWeatherData37.31-121.98', JSON.stringify(currentWeatherDataForAxios))
    window.localStorage.setItem('storedCurrentWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem('storedForecastWeatherData37.31-121.98', JSON.stringify(forecastWeatherDataForAxios))
    window.localStorage.setItem('storedForecastWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).currentWeatherData).toBeDefined()
    expect(getStore(App).currentWeatherData).toEqual(currentWeatherDataForAxios.data)
  })

  it('When we have both weather and map data on localStorage it use the local storage data', async () => {
    window.localStorage.setItem('storedLocationData-121.98,37.31', JSON.stringify(mapDataForAxios))
    window.localStorage.setItem('storedCurrentWeatherData37.31-121.98', JSON.stringify(currentWeatherDataForAxios))
    window.localStorage.setItem('storedCurrentWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem('storedForecastWeatherData37.31-121.98', JSON.stringify(forecastWeatherDataForAxios))
    window.localStorage.setItem('storedForecastWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).currentWeatherData).toBeDefined()
    expect(getStore(App).currentWeatherData).toEqual(currentWeatherDataForAxios.data)
  })
})
