import { put, take } from 'redux-saga/effects'
import { checkForStoredUnit, setUnitFC } from 'actions/actions'
import { CONST } from 'utilities/constants'

import { checkForStoredUnitSaga } from '../checkForStoredUnitSaga'
import { localStorageMock } from '../../test-utilities/mocks'

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})

describe('When we are testing checkForStoredUnitSaga', () => {

  it('There is not an stored unitFC on localStorage', () => {
    const gen = checkForStoredUnitSaga()
    expect(gen.next().value).toEqual(take(CONST.CHECK_FOR_STORE_UNIT))
    expect(gen.next(checkForStoredUnit()).value).toEqual(put(setUnitFC('f')))
  })

  it('There is not an stored unitFC on localStorage', () => {
    const gen = checkForStoredUnitSaga()
    window.localStorage.setItem('storedUnitFC', 'c')
    expect(gen.next().value).toEqual(take(CONST.CHECK_FOR_STORE_UNIT))
    expect(gen.next(checkForStoredUnit()).value).toEqual(put(setUnitFC('c')))
  })
})
