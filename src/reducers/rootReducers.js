import { CONST } from 'utilities/constants';

const rootReducers = (state, action) => {
  switch (action.type) {
    case CONST.SET_COORDS:
      return {...state, coords: action.coords};
    default:
      return state;
  }
};

export default rootReducers;
