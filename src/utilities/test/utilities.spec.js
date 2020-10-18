import {
  getUrl,
  getLocationName,
  isStoredDataFresh,
  getStoredData,
  getBackgroundsSrc,
  getLatLngFromCoords,
  getDateFromMilSeconds,
  getWindDir
} from '../utilities'
import { localStorageMock } from 'test-utilities/mocks'

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})


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

  it('isStoredDataFresh should return true if storage time less than on hour', () => {
    const now = new Date()
    const storageTime = new Date()
    storageTime.setMinutes(now.getMinutes() - 59)

    expect(isStoredDataFresh(storageTime)).toBe(true)
  })

  it('isStoredDataFresh should return false if storage time grater than on hour', () => {
    const now = new Date()
    const storageTime = new Date()
    storageTime.setMinutes(now.getMinutes() - 60)

    expect(isStoredDataFresh(storageTime)).toBe(false)
  })

  it('If we have an stored data in localStorage the getStoredData should return that to us', () => {
    window.localStorage.setItem('storedCurrentWeatherData37.31-121.98', JSON.stringify({ data: { weather: 'Very Hot' } }))
    window.localStorage.setItem('storedCurrentWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()))
    expect(getStoredData('storedCurrentWeatherData', '37.31', '-121.98')).toEqual({ weather: 'Very Hot' })
  })

  it('getBackgroundsSrc should return an image from unsplash.com', () => {
    expect(getBackgroundsSrc()).toContain('https://images.unsplash.com/photo')
  })

  it('getLatLngFromCoords should works with both String and Array arguments', () => {
    expect(getLatLngFromCoords('110,12')).toEqual({ latitude: 12, longitude: 110 })
    expect(getLatLngFromCoords([110, 12])).toEqual({ latitude: 12, longitude: 110 })
  })

  it('getDateFromMilSeconds gives us proper date format', () => {
    let date = new Date('01/05/2020').getTime().toString().substr(0, 10)
    let date2 = new Date('10/05/2020').getTime().toString().substr(0, 10)
    let date3 = new Date('08/12/2020').getTime().toString().substr(0, 10)
    let date4 = new Date('12/12/2020').getTime().toString().substr(0, 10)

    expect(getDateFromMilSeconds(date, 0)).toEqual('1/5')
    expect(getDateFromMilSeconds(date2, 0)).toEqual('10/5')
    expect(getDateFromMilSeconds(date3, 0)).toEqual('8/12')
    expect(getDateFromMilSeconds(date4, 0)).toEqual('12/12')
  })

  it('getWindDir gives us the proper direction', () => {
    for(let degree = 0; degree <= 360; degree++) {
      if (degree < 22.5 || degree >= 337.5) {
        expect(getWindDir(degree)).toEqual('North')
      } else if (degree > 22.5 && degree <= 67.5) {
        expect(getWindDir(degree)).toEqual('NW')
      } else if (degree > 67.5 && degree <= 112.5) {
        expect(getWindDir(degree)).toEqual('West')
      } else if (degree > 112.5 && degree <= 157.5) {
        expect(getWindDir(degree)).toEqual('SW')
      } else if (degree > 157.5 && degree <= 202.5) {
        expect(getWindDir(degree)).toEqual('South')
      } else if (degree > 202.5 && degree <= 247.5) {
        expect(getWindDir(degree)).toEqual('SE')
      } else if (degree > 247.5 && degree <= 292.5) {
        expect(getWindDir(degree)).toEqual('East')
      } else if (degree > 292.5 && degree < 337.5) {
        expect(getWindDir(degree)).toEqual('NE')
      }
    }
    expect(getWindDir('bla bla bla')).toEqual('not a degree')
  })
})
