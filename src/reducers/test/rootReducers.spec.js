import rootReducers from '../rootReducers'
import { setCoords, setMapData, setCurrentWeatherData, setLocationName, setFoundLocations } from 'actions/actions'

describe('When we are testing rootReducers', () => {

  it('Should should return the default state as hello = Salam', () => {
    expect(rootReducers({hello: 'Salam'}, {type: undefined})).toEqual({hello: 'Salam'})
  })

  it('Should updates coords state property', () => {
    expect(rootReducers({}, setCoords('12, 10'))).toEqual({coords: '12, 10'})
  })

  it('Should updates mapData state property', () => {
    expect(rootReducers({}, setMapData('mapDataInformation'))).toEqual({mapData: 'mapDataInformation'})
  })

  it('Should updates currentWeatherData state property', () => {
    expect(rootReducers({}, setCurrentWeatherData('currentWeatherDataInformation'))).toEqual({currentWeatherData: 'currentWeatherDataInformation'})
  })

  it('Should updates cityName and CountryName properties of state', () => {
    expect(rootReducers({}, setLocationName({cityName:'San Jose', countryName: 'US'}))).toEqual({cityName:'San Jose', countryName: 'US'})
  })

  it('Should updates foundLocations state property', () => {
    expect(rootReducers({}, setFoundLocations('locationInformation'))).toEqual({foundLocations: 'locationInformation'})
  })
})
