import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'

import { getLatLngFromCoords } from 'utilities/utilities'

import LocationList from '../LocationList'

jest.mock('utilities/utilities', () => {
  const rest = jest.requireActual('utilities/utilities')

  return ({
    ...rest,
    getLatLngFromCoords: jest.fn(() => ({latitude: 100, longitude: 50}))
  })
})

describe('When testing LocationList', () => {

  let wrapper


  it('If the isSearchDon be default it has to have no item in the list', () => {
    wrapper = mount(<RootForTests><LocationList /></RootForTests>)
    expect(wrapper.find('a')).toHaveLength(0)
  })

  it('If the isSearchDon be true it has to have 6 item in the list', () => {
    wrapper = mount(<RootForTests isSearchDone={true} ><LocationList /></RootForTests>)
    expect(wrapper.find('a')).toHaveLength(6)
  })

  it('when user click\'s on fourth option of list it get the data base on San Jose\'s longitude and latitude ', () => {
    wrapper = mount(<RootForTests isSearchDone={true} ><LocationList /></RootForTests>)
    wrapper.find('[className="dropdown-item"]').at(3).simulate('click')
    expect(getLatLngFromCoords).toHaveBeenCalledWith([-121.8261,37.2751])
  })

})
