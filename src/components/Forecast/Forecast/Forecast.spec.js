import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'

import Forecast from '../Forecast'

describe('When we are testing Forecast component', () => {

  let wrapper = mount(
    <RootForTests>
      <Forecast />
    </RootForTests>
  )

  it('should have proper structure', () => {
    expect(wrapper.find('[className="forecast"]')).toHaveLength(1)
  })

  it('should have dropDown element', () => {
    expect(wrapper.find('[className="dropDown"]')).toHaveLength(1)
  })

  it('should have hour element', () => {
    expect(wrapper.find('[className="text-center cell"]')).toHaveLength(2)
  })

  it('should have day element', () => {
    expect(wrapper.find('[className="forecastRow"]')).toHaveLength(2)
  })

  it('should have maxMin element', () => {
    expect(wrapper.find('[className="maxMin"]')).toHaveLength(2)
  })

})
