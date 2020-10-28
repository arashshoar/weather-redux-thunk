import { all, fork } from 'redux-saga/effects'
import getUsersLocationSaga from 'sagas/getUsersLocationSaga'
import { checkForStoredUnitSaga } from 'sagas/checkForStoredUnitSaga'
import { getWholeDataSaga } from 'sagas/getWholeDataSaga'
import rootSaga from '../rootSaga'

describe('When testing the root saga', () => {
  it('It should be run as the store created', () => {
    const gen = rootSaga()
    expect(gen.next().value).toEqual(all([fork(getUsersLocationSaga), fork(checkForStoredUnitSaga), fork(getWholeDataSaga)]))
  })
})
