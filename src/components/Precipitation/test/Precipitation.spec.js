import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'
import Precipitation from '../Precipitation'

describe('When we are testing Precipitation component', () => {
  let wrapper
  wrapper = mount(
    <RootForTests>
      <Precipitation/>
    </RootForTests>
  )

  it('should has it\'s own structure', () => {
    expect(wrapper.find('[className="precipitation"]')).toHaveLength(1)
    expect(wrapper.find('[className="cell"]')).toHaveLength(4)
    expect(wrapper.find('[className="cell"]').find('div')).toHaveLength(16)
  })
})
