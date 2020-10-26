import { put, take } from 'redux-saga/effects'
import { setUnitFC } from '../actions/actions'
import { CONST } from '../utilities/constants'

export function* checkForStoredUnitSaga() {
  yield take(CONST.GET_USERS_LOCATION)
  const storedUnitFC = window.localStorage.getItem('storedUnitFC')

  if (storedUnitFC !== 'undefined' && storedUnitFC) {
    yield put(setUnitFC(storedUnitFC))
  }

  if(!storedUnitFC) {
    yield put(setUnitFC('f'))
  }
}
