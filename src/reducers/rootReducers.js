import { CONST } from 'utilities/constants';

const rootReducers = (state, action) => {
  switch (action.type) {
    case CONST.SET_COORDS:
      return {...state, coords: action.coords};
    case CONST.SET_LOCATION_NAME:
      return {...state, locationName: action.locationName};
    case CONST.SET_FOUND_LOCATIONS:
      return {...state, foundLocations: action.foundLocations};
    default:
      return state;
  }
};

export default rootReducers;
