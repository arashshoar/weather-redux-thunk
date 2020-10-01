import axios from "axios";

export const getUrl = ({ name, accessKey, locationName, token, coords, latitude, longitude }) => {

  switch (name) {
    case 'coordsQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${token}`;
    case 'locationNameQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${token}`;
    case 'weatherQueryCurrent':
      return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${accessKey}`;
    case 'googleMap':
      return `https://maps.googleapis.com/maps/api/js?key=${accessKey}&callback=initMap`;
    default:
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${token}`;
  }
};

export const roundCoords = coords => coords.split(',').map(elem => Math.round(elem * 100)/100).join(',');

export const getLocationName = mapData => {
  const {features: places} = mapData;
  let cityName;
  let countryName;

  for (let place of places) {
    if (place['place_type'][0] === 'place') {
      cityName = place.text;
    }
    if (place['place_type'][0] === 'country') {
      countryName = place.text;
    }
  }

  if (!cityName) {
    for (let place of places) {
      if (place['place_type'][0] === 'postcode') {
        cityName = place['place_name'].split(',')[0];
      }
    }
  }

  if (!countryName) {
    countryName = places[places.length - 1].text;
    if (!cityName) {
      cityName = countryName;
    }
  }

  return {
    cityName,
    countryName
  };
};

export const isStoredDataFresh = storageTime => {
  const date = new Date();
  const sDate = new Date(Number(storageTime));

  return date.getTime() - sDate.getTime() < 3600000;
};

export const getStoredData = (latitude, longitude) => {
  const roundLat = Math.round(latitude * 100) / 100;
  const roundLng = Math.round(longitude * 100) / 100;
  const storedWeatherData = JSON.parse(window.localStorage.getItem('storedWeatherData' + roundLat + roundLng));
  const storageTime = JSON.parse(window.localStorage.getItem('storedWeatherDataTime' + roundLat + roundLng));

  return storedWeatherData && isStoredDataFresh(storageTime) ? storedWeatherData.data : false;
};

export const getFreshCurrentWeatherData = async (latitude, longitude) => {
  const roundLat = Math.round(latitude * 100) / 100;
  const roundLng = Math.round(longitude * 100) / 100;

  const data = await axios.get(getUrl({
    name: 'weatherQueryCurrent',
    accessKey: process.env.REACT_APP_WEATHER,
    latitude: roundLat,
    longitude: roundLng,
  }));
  window.localStorage.setItem('storedWeatherDataTime' + roundLat + roundLng, JSON.stringify(new Date().getTime()));
  window.localStorage.setItem('storedWeatherData' + roundLat + roundLng, JSON.stringify(data));

  return data.data;
};
