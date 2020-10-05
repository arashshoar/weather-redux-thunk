import React from 'react'
import { mount } from 'enzyme'

import Root from 'Root'
import App from 'App'
import { localStorageMock, geolocationMock } from 'test-utilities/mocks'
import { currentWeatherData } from 'utilities/test-utilities/mockData/currentWeatherData'
import { forecastWeatherData } from 'utilities/test-utilities/mockData/forecastWeatherData'
import { someCityCoords } from 'utilities/constants'

const mapData = require('utilities/test-utilities/mockData/mapData')

global.navigator.geolocation = geolocationMock

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})

jest.mock('axios', () => {
  const mapData = require('../utilities/test-utilities/mockData/mapData')
  return {get: jest.fn(() => Promise.resolve(mapData))}
})

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing App component', () => {
  let wrapper

  const getStore = App => App.find('Provider').prop('store').getState()

  wrapper = () => mount(<Root><App/></Root>)

  it('Should run the test file', () => {
    expect(App).toBeDefined()
  })

  it('Wrapper should have one child and when user denied application to get their location it should have New York as location', async () => {
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
    window.localStorage.setItem('storedCurrentWeatherData37.31-121.98', JSON.stringify(currentWeatherData))
    window.localStorage.setItem('storedCurrentWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem('storedForecastWeatherData37.31-121.98', JSON.stringify(forecastWeatherData))
    window.localStorage.setItem('storedForecastWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).currentWeatherData.currentWeatherData.dt).toBe(1601486785)
  })

  it('When we have both weather and map data on localStorage it use the local storage data', async () => {
    window.localStorage.setItem('storedLocationData-121.98,37.31', JSON.stringify(mapData))
    window.localStorage.setItem('storedCurrentWeatherData37.31-121.98', JSON.stringify(currentWeatherData))
    window.localStorage.setItem('storedCurrentWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    window.localStorage.setItem('storedForecastWeatherData37.31-121.98', JSON.stringify(forecastWeatherData))
    window.localStorage.setItem('storedForecastWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    const App = wrapper()
    await flushPromise()
    expect(getStore(App).currentWeatherData.currentWeatherData.dt).toBe(1601486785)
  })
})
