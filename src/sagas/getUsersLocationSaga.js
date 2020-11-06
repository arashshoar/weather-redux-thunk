import { call, put, take } from 'redux-saga/effects'

import { CONST, someCityCoords } from '../utilities/constants'
import { getUserCurrentPosition } from '../utilities/utilities'
import { checkForStoredUnit } from '../actions/actions'
import { getWholeData } from '../actions/actions'


function* getUsersLocationSaga() {
  while (true) {
    let latitude, longitude
    yield take(CONST.GET_USERS_LOCATION)
    try {
      ({ coords: { latitude, longitude } } = yield call(getUserCurrentPosition))
    } catch (error) {
      ([longitude, latitude] = someCityCoords.NewYork.split(','))
      console.log('User denied to let us have access their location:', error)
    } finally {
      yield put(checkForStoredUnit())
      yield put(getWholeData(latitude, longitude))
    }
  }
}

export default getUsersLocationSaga
