import { getUserCurrentPosition } from 'utilities/utilities'
import { someCityCoords } from 'utilities/constants'
import { getWholeData } from './getWholeData'
import { checkForStoredUnit } from './checkForStoredUnit'

export const getUsersLocation = () => {

  return async dispatch => {

    try {
      const { coords: { latitude, longitude } } = await getUserCurrentPosition()
      dispatch(checkForStoredUnit())
      dispatch(getWholeData(latitude, longitude))
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message)
      const [longitude, latitude] = someCityCoords.NewYork.split(',')
      dispatch(checkForStoredUnit())
      dispatch(getWholeData(latitude, longitude))
    }
  }
}

