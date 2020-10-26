import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'

import LocationInput from '../LocationInput'
import { setIsSearchDone } from 'actions/actions'
import { fetchLocations } from 'utilities/utilitiesPart2'

jest.mock('actions/fetchActions', () => {
  const rest = jest.requireActual('actions/fetchActions')

  return ({
    ...rest,
    fetchLocations: jest.fn().mockImplementation(() => (fn = jest.fn()) => ({ type: '', features: [
      {
        center: [100, 50],
        place_type: ['place']
      }
    ]
    }))
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

  it('check if controlled input is working fine', () => {
    wapper = mount(<RootForTests><LocationInput /></RootForTests>)
    wapper.find('input').simulate('change', { target: { value: 'Salam all my Friends' } })
    expect(wapper.find('input').prop('value')).toBe('Salam all my Friends')
  })

  it('when user click on search button store getting fresh data for application', async () => {
    wapper = mount(<RootForTests><LocationInput /></RootForTests>)
    wapper.find('button').simulate('click')
    await flushPromise()
    expect(setIsSearchDone).toHaveBeenCalledWith(true)
    expect(fetchLocations).toHaveBeenCalled()
  })

  it('when user enter new search term in location input store getting fresh data for application', () => {
    wapper = mount(<RootForTests><LocationInput /></RootForTests>)
    wapper.find('input').simulate('keyDown', { key: 'Enter' })
    expect(setIsSearchDone).toHaveBeenCalledWith(true)
    expect(fetchLocations).toHaveBeenCalled()
  })
})
