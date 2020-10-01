import { CONST } from 'utilities/constants';
import axios from 'axios';

import { getUrl, getLocationName, roundCoords, getStoredData, getFreshCurrentWeatherData } from "utilities/utilities";

export const getUserCurrentPosition = options => (
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

export const setFoundLocations = foundLocations => ({
  type: CONST.SET_FOUND_LOCATIONS,
  foundLocations,
});

export const setMapData = mapData => ({
  type: CONST.SET_MAP_DATA,
  mapData,
});

export const setCurrentWeatherData = (currentWeatherData) => ({
  type: CONST.SET_CURRENT_WEATHER_DATA,
  currentWeatherData,
});

export const getUsersLocation = () => {

  return async dispatch => {

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
      dispatch(fetchWeather(latitude, longitude));
      dispatch(setCoords(`${longitude},${latitude}`));
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message);
      dispatch(fetchLocations({coords: '-73.9808,40.7648'}));
      dispatch(fetchWeather('40.7648', '-73.9808'));
      dispatch(setCoords('-73.9808,40.7648'));
    }
  };
};

export const fetchLocations = ({ coords, locationName }) => {

  return async dispatch => {

    try {
      const storedLocationData = JSON.parse(window.localStorage.getItem('storedLocationData' + roundCoords(coords)));

      const data = storedLocationData
        ? storedLocationData
        : await axios.get(getUrl({
              name: coords ? 'coordsQuery' : 'locationNameQuery',
              token: process.env.REACT_APP_TOKEN,
              locationName,
              coords
            }));

      window.localStorage.setItem('storedLocationData' + roundCoords(coords), JSON.stringify(data));
      const { data: mapData } = data;
      dispatch(setLocationName(getLocationName(mapData)));
      dispatch(setMapData(mapData));

    } catch (error) {
      console.log('Location Error:', error);
    }
  }
};

export const fetchWeather = (latitude, longitude) => {
  return async dispatch => {

    const weatherCurrentData = getStoredData(latitude, longitude)
      ? getStoredData(latitude, longitude)
      : await getFreshCurrentWeatherData(latitude, longitude);

    dispatch(setCurrentWeatherData(weatherCurrentData));
  }
};
