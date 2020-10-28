import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'

import LocationInput from '../LocationInput'
import { setIsSearchDone } from 'actions/actions'
import { fetchLocations } from 'utilities/utilitiesPart2'

jest.mock('utilities/utilitiesPart2', () => {
  const rest = jest.requireActual('utilities/utilitiesPart2')
  const axiosMapData = require('utilities/test-utilities/mockData/commonJS/mapDataForAxios_CommonJS.js')

  return ({
    ...rest,
    fetchLocations: jest.fn().mockImplementation(() => Promise.resolve(axiosMapData)),
  })
})

jest.mock('actions/actions', () => {
  const rest = jest.requireActual('actions/actions')

  return ({
    ...rest,
    setIsSearchDone: jest.fn().mockImplementation(() => ({ type: '', payload: '' }))
  })
})

const flushPromise = () => new Promise(resolve => setTimeout(resolve, 0))

describe('When we are testing the LocationInput component', () => {
  let wapper
  wapper = mount(<RootForTests><LocationInput /></RootForTests>)

  it('check if controlled input is working fine', () => {
    wapper.find('input').simulate('change', { target: { value: 'Salam all my Friends' } })
    expect(wapper.find('input').prop('value')).toBe('Salam all my Friends')
  })

  it('when user click on search button store getting fresh data for application', async () => {
    wapper.find('button').simulate('click')
    await flushPromise()
    expect(setIsSearchDone).toHaveBeenCalledWith(true)
    expect(fetchLocations).toHaveBeenCalled()
  })

  it('when user enter new search term in location input store getting fresh data for application', () => {
    wapper.find('input').simulate('keyDown', { key: 'Enter' })
    expect(setIsSearchDone).toHaveBeenCalledWith(true)
    expect(fetchLocations).toHaveBeenCalled()
  })

  it('should have an input element', () => {
    expect(wapper.find('input')).toHaveLength(1)
  })

  it('should have an button element', () => {
    expect(wapper.find('button')).toHaveLength(1)
  })
})
