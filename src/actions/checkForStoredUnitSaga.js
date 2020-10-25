import { put, take } from 'redux-saga/effects'
import { setUnitFC } from './actions'
import { CONST } from '../utilities/constants'

// export const checkForStoredUnit = () => dispatch => {
//   const storedUnitFC = window.localStorage.getItem('storedUnitFC')
//
//   if (storedUnitFC !== 'undefined' && storedUnitFC) {
//     dispatch(setUnitFC(storedUnitFC))
//   }
//
//   if(!storedUnitFC) {
//     dispatch(setUnitFC('f'))
//   }
// }

export function* checkForStoredUnitSaga() {
  yield take(CONST.GET_USERS_LOCATION)
  const storedUnitFC = window.localStorage.getItem('storedUnitFC')

  if (storedUnitFC !== 'undefined' && storedUnitFC) {
    console.log('Salam 41')
    yield put(setUnitFC(storedUnitFC))
  }

  if(!storedUnitFC) {
    console.log('Salam 42')
    yield put(setUnitFC('f'))
  }
}
