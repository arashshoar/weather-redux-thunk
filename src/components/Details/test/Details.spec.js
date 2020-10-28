import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'
import Details from '../Details'

describe('When we are testing Details component', () => {
  let wrapper
  wrapper = mount(
    <RootForTests>
      <Details/>
    </RootForTests>
  )

  it('should has to have proper structure', () => {
    expect(wrapper.find('[className="details"]')).toHaveLength(1)
    expect(wrapper.find('[className*="detailsIconContainer"] img')).toHaveLength(1)
    expect(wrapper.find('[className*="detailsTable"] div')).toHaveLength(12)
    expect(wrapper.find('[className="detailsReport"] div')).toHaveLength(2)
  })
})
