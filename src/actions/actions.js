import { CONST } from 'utilities/constants';
import axios from 'axios';

import { getUrl } from "utilities/utilities";

export const getUserCurrentPosition = (options) => (
  new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
);

export const setCoords = coords => ({
  type: CONST.SET_COORDS,
  coords,
});

export const getUsersLocation = () => {

  return async (dispatch) => {

    // New York
    // 40.7648,-73.9808
    //
    // Atlanta
    // 33.7491,-84.3902
    //
    // Miniapolis
    // -6.193206,106.821957

    try {
      const { coords: {latitude, longitude}} = await getUserCurrentPosition();
      dispatch(setCoords(`${latitude},${longitude}`));
      dispatch(fetchLocations({coords: `${longitude},${latitude}`}));
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message);
      dispatch(setCoords(`40.7648, -73.9808`));
    }
  };
};

export const fetchLocations = ({ locationName, coords }) => {
  return async function (dispatch) {
    const data = await axios.get(getUrl({
      name: coords ? 'coordsQuery': 'locationNameQuery',
      token: process.env.REACT_APP_TOKEN,
      locationName,
      coords
    }));

    console.log("Arash Data:", data.data);

  }
};































