import { call, put, take } from 'redux-saga/effects'

import { CONST, someCityCoords } from '../utilities/constants'
import { getUserCurrentPosition } from '../utilities/utilities'
import { checkForStoredUnit } from '../actions/actions'
import { getWholeData } from '../actions/actions'


function* getUsersLocationSaga() {

  while (true) {
    yield take(CONST.GET_USERS_LOCATION)
    try {
      const { coords: { latitude, longitude } } = yield call(getUserCurrentPosition)
      yield put(checkForStoredUnit())
      yield put(getWholeData(latitude, longitude))
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message)
      const [longitude, latitude] = someCityCoords.NewYork.split(',')
      yield put(checkForStoredUnit())
      yield put(getWholeData(latitude, longitude))
    }
  }
}

export default getUsersLocationSaga
