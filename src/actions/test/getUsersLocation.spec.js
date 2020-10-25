import { put, take, call } from 'redux-saga/effects'

import { getWholeData } from '../getWholeDataSaga'
import { getUsersLocation } from '../actions'
import { CONST, someCityCoords } from 'utilities/constants'
import getUsersLocationSaga from 'store/sagas/getUsersLocationSaga'
import { getUserCurrentPosition } from '../../utilities/utilities'
import { checkForStoredUnit } from 'actions/actions'

jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')

  return {
    ...rest,
    getUserCurrentPosition: jest.fn()
      .mockImplementationOnce(() => Promise.resolve({ coords: { latitude: '37.3118288', longitude: '-121.9770887' } }))
      .mockImplementationOnce(() => Promise.resolve({ coords: { latitude: '37.3118288', longitude: '-121.9770887' } }))
      .mockImplementationOnce(() => new Error('User deny to get use their location'))
  }
})

// jest.mock('../actions')
// jest.mock('../getWholeData')

const positionResult = { coords: { latitude: '37.3118288', longitude: '-121.9770887' } }

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing getUsersLocation', () => {
  const gen = getUsersLocationSaga()

  xit('if user let us to get his location gives us their location', async () => {
    const [longitude, latitude] = someCityCoords.SanJose.split(',')
    getUsersLocation()(jest.fn())
    await flushPromise()
    expect(getWholeData).toHaveBeenCalledWith(latitude, longitude)
  })

  xit('if user doesn\'t let us to access their location gives us default which is New York\'s', async () => {
    jest.clearAllMocks()
    const [longitude, latitude] = someCityCoords.NewYork.split(',')
    getUsersLocation()(jest.fn())
    await flushPromise()
    expect(getWholeData).toHaveBeenCalledWith(latitude, longitude)
  })

  it('', () => {
    expect(gen.next().value).toEqual(take(CONST.GET_USERS_LOCATION))
    expect(gen.next(getUsersLocation()).value).toEqual(call(getUserCurrentPosition))
    expect(gen.next(positionResult).value).toEqual(put(checkForStoredUnit()))
    expect(gen.next(checkForStoredUnit()).value).toEqual(put(getWholeData('37.3118288', '-121.9770887')))
  })




























})
