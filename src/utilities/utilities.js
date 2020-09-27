
export const getUrl = ({ name, accessKey, locationName, token, coords }) => {
  const [lon, lat] = coords.split(',');

  switch (name) {
    case 'coordsQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${token}`;
    case 'locationNameQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${token}`;
    case 'weather':
      return `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${accessKey}`;
    case 'googleMap':
      return `https://maps.googleapis.com/maps/api/js?key=${accessKey}&callback=initMap`;
    default:
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${token}`;
  }
};

export const mapPlacesToLocations = places => places.map(
  ({ id, type, text, place_name, geometry: { coordinates } }) => ({id, type, text, place_name, coordinates}), []
);
