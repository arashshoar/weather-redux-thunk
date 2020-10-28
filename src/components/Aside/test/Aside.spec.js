import React from 'react'
import { shallow } from 'enzyme'

import Aside from '../Aside'

describe('Advertisement has to have the sanity structure', () => {

  let wrapper = shallow(<Aside />)

  it('should GadgetContainer component', () => {
    expect(wrapper.find('GadgetContainer')).toHaveLength(1)
  })

  it('should Links component', () => {
    expect(wrapper.find('Links')).toHaveLength(1)
  })
})
