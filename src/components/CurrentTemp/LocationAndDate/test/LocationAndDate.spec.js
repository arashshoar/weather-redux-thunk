import React from 'react'
import { shallow } from 'enzyme'

import LocationAndDate from '../LocationAndDate'

describe('When we are testing LocationAndDat', () => {
  let wrapper = shallow(<LocationAndDate />)

  it('should has to have it\'s own structure', () => {
    expect(wrapper.find('div')).toHaveLength(5)
  })

  it('should has to have one city name element', () => {
    expect(wrapper.find('[className*="city"]')).toHaveLength(1)
  })

  it('should has to have one country name element', () => {
    expect(wrapper.find('[className*="country"]')).toHaveLength(1)
  })

  it('should has to have one dateTime name element', () => {
    expect(wrapper.find('[className*="dateTime"]')).toHaveLength(1)
  })
})
