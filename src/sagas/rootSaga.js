import { all, fork } from 'redux-saga/effects'
import getUsersLocationSaga from './getUsersLocationSaga'
import { checkForStoredUnitSaga } from './checkForStoredUnitSaga'
import { getWholeDataSaga } from 'sagas/getWholeDataSaga'

export default function* rootSaga(rootSaga) {
  yield all([fork(getUsersLocationSaga), fork(checkForStoredUnitSaga), fork(getWholeDataSaga)])
}
