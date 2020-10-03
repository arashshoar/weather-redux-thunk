import { CONST, someCityCoords } from 'utilities/constants';
import axios from 'axios';

import { getUrl, getLocationName, roundCoords, getStoredData, getFreshWeatherData } from "utilities/utilities";

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

export const setForecastWeatherData = (forecastWeatherData) => ({
  type: CONST.SET_FORECAST_WEATHER_DATA,
  forecastWeatherData,
});

export const getUsersLocation = () => {

  return async dispatch => {

    try {
      const { coords: {latitude, longitude}} = await getUserCurrentPosition();
      dispatch(fetchLocations({coords: `${longitude},${latitude}`}));
      dispatch(fetchWeather('weatherQueryCurrent', 'storedCurrentWeatherData', latitude, longitude));
      dispatch(fetchWeather('weatherQueryForecast', 'storedForecastWeatherData', latitude, longitude));
      dispatch(setCoords(`${longitude},${latitude}`));
    } catch (error) {
      console.log('User denied to let us have access their location:', error.message);
      dispatch(fetchLocations({coords: someCityCoords.NewYork}));
      dispatch(fetchWeather('weatherQueryCurrent', 'storedCurrentWeatherData', '40.7648', '-73.9808'));
      dispatch(fetchWeather('weatherQueryForecast','storedForecastWeatherData', '40.7648', '-73.9808'));
      dispatch(setCoords(someCityCoords.NewYork));
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

export const fetchWeather = (weatherQueryKey, storeKey, latitude, longitude) => {

  return async dispatch => {

    const weatherData = getStoredData(storeKey, latitude, longitude)
      ? getStoredData(storeKey, latitude, longitude)
      : await getFreshWeatherData(weatherQueryKey, storeKey, latitude, longitude);

    if (weatherQueryKey === 'weatherQueryCurrent') {
      dispatch(setCurrentWeatherData(weatherData));
    } else {
      dispatch(setForecastWeatherData(weatherData))
    }
  }
};
