import React from 'react'
import { shallow } from 'enzyme'

import Advertisement from '../Advertisement'

describe('Advertisement has to have the sanity structure', () => {

  let wrapper = shallow(<Advertisement />)

  it('should GadgetContainer component', () => {
    expect(wrapper.find('GadgetContainer')).toHaveLength(1)
  })

  it('should Links component', () => {
    expect(wrapper.find('Links')).toHaveLength(1)
  })
})
