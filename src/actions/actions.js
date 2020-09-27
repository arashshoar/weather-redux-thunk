import { CONST } from 'utilities/constants';
import axios from 'axios';

import { getUrl, mapPlacesToLocations } from "utilities/utilities";

export const getUserCurrentPosition = (options) => (
  new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
);

export const setCoords = coords => ({
  type: CONST.SET_COORDS,
  coords,
});

export const setLocationName = locationName => ({
  type: CONST.SET_LOCATION_NAME,
  locationName,
});

export const setFoundLocations = (foundLocations) => ({
  type: CONST.SET_FOUND_LOCATIONS,
  foundLocations,
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
      dispatch(fetchLocations({coords: `${longitude},${latitude}`}));
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message);
      dispatch(fetchLocations({coords: '-73.9808,40.7648'}));
    }
  };
};

export const fetchLocations = ({ coords, locationName }) => {

  return async (dispatch) => {

    try {
      const data = await axios(getUrl({
        name: coords ? 'coordsQuery' : 'locationNameQuery',
        token: process.env.REACT_APP_TOKEN,
        locationName,
        coords
      }));

      const { data: {features: places} } = data;
      const foundLocations = Array.isArray(places) && places.length ?
        mapPlacesToLocations(places) :
        dispatch(fetchLocations({locationName: 'New York'}));

      dispatch(setFoundLocations(foundLocations));

      const [{coordinates: [longitude, latitude], text: locationNameFounded}] = foundLocations;
      dispatch(setCoords(`${latitude},${longitude}`));
      dispatch(setLocationName(locationNameFounded));

    } catch (error) {
      console.log('Location Error:', error);
    }
  }
};
