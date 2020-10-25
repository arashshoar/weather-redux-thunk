import { call, put, take, takeEvery } from 'redux-saga/effects'

import { CONST, someCityCoords } from '../../utilities/constants'
import { getUserCurrentPosition } from '../../utilities/utilities'
import { checkForStoredUnit } from '../../actions/actions'
import { getWholeData } from '../../actions/actions'


function* getUsersLocationSaga() {
  yield take(CONST.GET_USERS_LOCATION)
  try {
    console.log('Salam1')
    const { coords: { latitude, longitude } } = yield call(getUserCurrentPosition)
    console.log('Salam2', latitude)

    yield put(checkForStoredUnit())
    console.log('Salam3')

    yield put(getWholeData(latitude, longitude))
  } catch (error) {
    console.log('User denied to let us have access their location:', error.message)
    const [longitude, latitude] = someCityCoords.NewYork.split(',')
    yield put(checkForStoredUnit())
    yield put(getWholeData(latitude, longitude))
  }

}

export default getUsersLocationSaga
