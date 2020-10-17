import { setUnitFC } from './actions'

export const checkForStoredUnit = () => dispatch => {
  const storedunitFC = window.localStorage.getItem('storedunitFC')

  if (storedunitFC !== 'undefined' && storedunitFC) {
    dispatch(setUnitFC(storedunitFC))
  }

  if(!storedunitFC) {
    dispatch(setUnitFC('f'))
  }
}
