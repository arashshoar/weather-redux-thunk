jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')

  return {
    ...rest,
    getUserCurrentPosition: jest.fn()
      .mockImplementationOnce(() => Promise.resolve({coords: {latitude: '37.3118288', longitude: '-121.9770887'}}))
      .mockImplementationOnce(() => new Error('User deny to get use their location'))
  }
})

jest.mock('../actions')
jest.mock('../getWholeData')

import { getWholeData } from  '../getWholeData'
import { getUsersLocation } from '../getUsersLocation'
import { someCityCoords } from 'utilities/constants'

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing getUsersLocation', () => {

  it('if user let us to get his location gives us their location', async () => {
    const [longitude, latitude] = someCityCoords.SanJose.split(',')
    getUsersLocation()(jest.fn())
    await flushPromise()
    expect(getWholeData).toHaveBeenCalledWith(latitude, longitude)
  })

  it('if user doesn\'t let us to access their location gives us default which is New York\'s', async () => {
    jest.clearAllMocks()
    const [longitude, latitude] = someCityCoords.NewYork.split(',')
    getUsersLocation()(jest.fn())
    await flushPromise()
    expect(getWholeData).toHaveBeenCalledWith(latitude, longitude)
  })
})
