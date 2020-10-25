import { all } from 'redux-saga/effects'
import getUsersLocationSaga from './getUsersLocationSaga'
import { checkForStoredUnitSaga } from '../../actions/checkForStoredUnitSaga'
import { getWholeDataSaga } from 'actions/getWholeDataSaga'

export default function* rootSaga(rootSaga) {
  yield all([getUsersLocationSaga(), checkForStoredUnitSaga(), getWholeDataSaga()])
}
