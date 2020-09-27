
export const getUrl = ({ name, accessKey, locationName, token, coords }) => {
  switch (name) {
    case 'coordsQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${token}`;
    case 'locationNameQuery':
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${token}`;
    case 'weather':
      return `http://api.weatherstack.com/forecast?access_key=${accessKey}&query=${coords}&units=f`;
    case 'googleMap':
      return `https://maps.googleapis.com/maps/api/js?key=${accessKey}&callback=initMap`;
    default:
      return `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${token}`;
  }
};
