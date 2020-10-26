import { getWholeData } from '../../sagas/getWholeDataSaga'
import { fetchLocations, fetchWeather } from '../../utilities/utilitiesPart2'
import { setCoords } from '../actions'

jest.mock('../fetchActions', () => {
  const mapData = require('utilities/test-utilities/mockData/mapDataForAxios.js')
  return({
    fetchLocations: jest.fn().mockImplementationOnce(() => Promise.resolve(mapData)),
    fetchWeather: jest.fn()
  })
})

jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')

  return ({
    ...rest,
    getLocationName: jest.fn(() => ({
      cityName: 'New York', countryName: 'US'
    }))
  })
})

jest.mock('../actions')

describe('When we testing getWholeData', () => {

  const dispatchMock = jest.fn(a => a)

  const flushPromise = () => {
    return new Promise(resolve => setTimeout(resolve, 0))
  }

  it('every time it calls it gets all data location, current, forecast and coords for store', async () => {
    await getWholeData(100, 50)(dispatchMock)
    flushPromise()
    expect(fetchLocations).toHaveBeenCalledTimes(1)
    expect(fetchWeather).toHaveBeenCalledTimes(2)
    expect(setCoords).toHaveBeenCalledTimes(1)
  })
})
