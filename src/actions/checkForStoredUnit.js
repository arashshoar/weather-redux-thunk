import { setunitFC } from './actions'

export const checkForStoredUnit = () => dispatch => {
  const storedunitFC = window.localStorage.getItem('storedunitFC')

  if (storedunitFC !== 'undefined' && storedunitFC) {
    dispatch(setunitFC(storedunitFC))
  }

  if(!storedunitFC) {
    dispatch(setunitFC('f'))
  }
}
