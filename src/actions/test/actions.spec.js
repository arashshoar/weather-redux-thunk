import { CONST } from 'utilities/constants'

import * as ACTIONS from '../actions'

describe('Our actions have to a sanity Input/Output', () => {
  it('getUsersLocation:', () => {
    expect(ACTIONS.getUsersLocation()).toEqual({ type: CONST.GET_USERS_LOCATION, })
  })

  it('checkForStoredUnit:', () => {
    expect(ACTIONS.checkForStoredUnit())
      .toEqual({ type: CONST.CHECK_FOR_STORE_UNIT, })
  })

  it('getWholeData:', () => {
    expect(ACTIONS.getWholeData(50, -100))
      .toEqual({
        type: CONST.GET_WHOLE_DATA,
        payload: { latitude: 50, longitude: -100 }
      })
  })

  it('setCoords:', () => {
    expect(ACTIONS.setCoords('-100, 50'))
      .toEqual({
        type: CONST.SET_COORDS,
        coords: '-100, 50',
      })
  })

  it('setLocationName:', () => {
    expect(ACTIONS.setLocationName('New York'))
      .toEqual({
        type: CONST.SET_LOCATION_NAME,
        locationName: 'New York',
      })
  })

  it('setMapData:', () => {
    expect(ACTIONS.setMapData({ data: {} }))
      .toEqual({
        type: CONST.SET_MAP_DATA,
        mapData: { data: {} },
      })
  })

  it('setCurrentWeatherData:', () => {
    expect(ACTIONS.setCurrentWeatherData({ data: {} }))
      .toEqual({
        type: CONST.SET_CURRENT_WEATHER_DATA,
        currentWeatherData: { data: {} },
      })
  })

  it('setForecastWeatherData:', () => {
    expect(ACTIONS.setForecastWeatherData({ data: {} }))
      .toEqual({
        type: CONST.SET_FORECAST_WEATHER_DATA,
        forecastWeatherData: { data: {} },
      })
  })

  it('setIsSearchDone:', () => {
    expect(ACTIONS.setIsSearchDone('true/false'))
      .toEqual({
        type: CONST.SET_IS_SEARCH_DONE,
        isSearchDone: 'true/false',
      })
  })

  it('setUnitFC:', () => {
    expect(ACTIONS.setUnitFC('f/c'))
      .toEqual({
        type: CONST.SET_UNIT_CF,
        unitFC: 'f/c',
      })
  })
})
