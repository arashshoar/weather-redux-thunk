import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'

import GoogleMap from '../GoogleMap'

describe('When we are testing GoogleMap component', () => {
  const rootElement = document.createElement('div')
  rootElement.setAttribute('id', 'root')
  document.body.append(rootElement)

  const wrapper = mount(<RootForTests><GoogleMap/></RootForTests>)

  it('It should contains a GadgetContainer component', () => {
    expect(wrapper.find('GadgetContainer')).toHaveLength(1)
  })

  it('It should contains a googleMap element', () => {
    expect(wrapper.find('[className="googleMap"]')).toHaveLength(1)
  })
})
