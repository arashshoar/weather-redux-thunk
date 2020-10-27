import { take, put, call } from 'redux-saga/effects'

import { CONST } from 'utilities/constants'
import getUsersLocationSaga from '../getUsersLocationSaga'
import { getUserCurrentPosition } from 'utilities/utilities'
import { checkForStoredUnit, getUsersLocation, getWholeData } from 'actions/actions'

jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')
  const userLocation = {
    coords: {
      latitude: 100,
      longitude: -50,
    }
  }

  return({
    ...rest,
    getUserCurrentPosition: jest.fn()
      .mockImplementationOnce(() => Promise.resolve(userLocation))
      .mockImplementationOnce(() => Promise.reject(new Error('This is an error')))
  })
})

describe('When we are testing getUsersLocationSaga', () => {
  const userLocation = {
    coords: {
      latitude: 100,
      longitude: -50,
    }
  }

  it('When user let us to access their location', () => {
    const gen = getUsersLocationSaga()

    expect(gen.next().value).toEqual(take(CONST.GET_USERS_LOCATION))
    expect(gen.next(getUsersLocation()).value).toEqual(call(getUserCurrentPosition))
    expect(gen.next(userLocation).value).toEqual(put(checkForStoredUnit()))
    expect(gen.next(checkForStoredUnit()).value).toEqual(put(getWholeData(100, -50)))
  })

  it('When user doesn\'t let us to access their location application uses the New York\'s', () => {
    const gen = getUsersLocationSaga()
    expect(gen.next().value).toEqual(take(CONST.GET_USERS_LOCATION))
    expect(gen.next(getUsersLocation()).value).toEqual(call(getUserCurrentPosition))
    expect(gen.next(getUserCurrentPosition()).value).toEqual(put(checkForStoredUnit()))
    expect(gen.next(checkForStoredUnit()).value).toEqual(put(getWholeData('40.7648', '-73.9808')))
  })
})
