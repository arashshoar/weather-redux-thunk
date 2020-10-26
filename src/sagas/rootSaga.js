import { all } from 'redux-saga/effects'
import getUsersLocationSaga from './getUsersLocationSaga'
import { checkForStoredUnitSaga } from './checkForStoredUnitSaga'
import { getWholeDataSaga } from 'sagas/getWholeDataSaga'

export default function* rootSaga(rootSaga) {
  yield all([getUsersLocationSaga(), checkForStoredUnitSaga(), getWholeDataSaga()])
}
