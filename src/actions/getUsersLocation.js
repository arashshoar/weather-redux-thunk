import { getUserCurrentPosition } from 'utilities/utilities'
import { someCityCoords } from 'utilities/constants'
import { getWholeData } from './getWholeData'


export const getUsersLocation = () => {

  return async dispatch => {

    try {
      const {coords: {latitude, longitude}} = await getUserCurrentPosition()
      dispatch(getWholeData(latitude, longitude))
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message)
      const [longitude, latitude] = someCityCoords.NewYork.split(',')
      dispatch(getWholeData(latitude, longitude))
    }
  }
}

