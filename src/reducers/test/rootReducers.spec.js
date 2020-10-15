import rootReducers from '../rootReducers'
import { setCoords, setMapData, setCurrentWeatherData, setLocationName, setFoundLocations, setIsSearchDone, setunitFC, setForecastWeatherData } from 'actions/actions'
import { storeStateIint } from 'utilities/test-utilities/mockData/storeStateInit'

describe('When we are testing rootReducers', () => {

  it('Should should return the default state as hello = Salam', () => {
    expect(rootReducers({hello: 'Salam'}, {type: undefined})).toEqual({hello: 'Salam'})
  })

  it('Should should return the default state as hello = Salam', () => {
    expect(rootReducers(undefined, {type: undefined})).toEqual(storeStateIint)
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

  it('Should updates isSearchDone state property', () => {
    expect(rootReducers({}, setForecastWeatherData('forecastWeatherData'))).toEqual({forecastWeatherData: 'forecastWeatherData'})
  })

  it('Should updates isSearchDone state property', () => {
    expect(rootReducers({}, setIsSearchDone(true))).toEqual({isSearchDone: true})
  })

  it('Should should return the default state as hello = Salam', () => {
    expect(rootReducers({}, setunitFC('c'))).toEqual({unitFC: 'c'})
  })
})
