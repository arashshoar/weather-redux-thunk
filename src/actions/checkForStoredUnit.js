import { setUnitFC } from './actions'

export const checkForStoredUnit = () => dispatch => {
  const storedUnitFC = window.localStorage.getItem('storedUnitFC')

  if (storedUnitFC !== 'undefined' && storedUnitFC) {
    dispatch(setUnitFC(storedUnitFC))
  }

  if(!storedUnitFC) {
    dispatch(setUnitFC('f'))
  }
}
