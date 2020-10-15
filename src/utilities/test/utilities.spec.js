import { getUrl, getLocationName } from '../utilities'

describe('When we test utilities functions', () => {
  const options = {
    name: '',
    accessKey: 'key',
    locationName: 'location',
    token: 'token',
    coords: '4,8',
    latitude: 'lat',
    longitude: 'lng',
  }

  const mapData = {
    features: [
      {
        'place_type': ['place'],
        text: 'San Jose',
      },
      {
        'place_type': ['postcode'],
        'place_name': 'San Fransisco, 95555, United States',
      },
      {
        'place_type': ['country'],
        text: 'United States',
      },
    ]
  }

  it('getUrl function Base on proper name argument we get the right url', () => {
    options.name = 'coordsQuery'
    expect(getUrl(options)).toBe('https://api.mapbox.com/geocoding/v5/mapbox.places/4,8.json?access_token=token')
    options.name = 'locationNameQuery'
    expect(getUrl(options)).toBe('https://api.mapbox.com/geocoding/v5/mapbox.places/location.json?access_token=token')
    options.name = 'weatherQueryCurrent'
    expect(getUrl(options)).toBe('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=lat&lon=lng&appid=key')
    options.name = 'googleMap'
    expect(getUrl(options)).toBe('https://maps.googleapis.com/maps/api/js?key=key&callback=initMap')
    options.name = ''
    expect(getUrl(options)).toBe('https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=token')
  })

  it('getLocationName gives us both cityName and countryName out of mapData', () => {
    expect(getLocationName(mapData)).toEqual({ cityName: 'San Jose', countryName: 'United States' })
    mapData.features[0]['place_type'] = 'address'
    expect(getLocationName(mapData)).toEqual({ cityName: 'San Fransisco', countryName: 'United States' })
    mapData.features[1]['place_type'] = 'address'
    mapData.features[2]['place_type'] = 'address'
    expect(getLocationName(mapData)).toEqual({ cityName: 'United States', countryName: 'United States' })
  })
})
