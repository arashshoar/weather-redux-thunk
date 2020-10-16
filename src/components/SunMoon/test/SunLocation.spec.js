import React from 'react'
import { shallow } from 'enzyme'
import SunLocation from '../SunLocation'

describe('When we test SunLocation', () => {

  let wrapper

  it('Should render Sun And Moon graph', () => {
    wrapper = shallow(<SunLocation sunRise="7:30" sunSet="19:30" baseMoveToLeft={100} />)
    expect(wrapper.find('svg')).toHaveLength(4)
  })

  it('Should shows Sun Rise and Sun Set with no leading 0', () => {
    wrapper = shallow(<SunLocation sunRise="07:30" sunSet="09:30" baseMoveToLeft={100} />)
    expect(wrapper.find('[className="sunRise"]').text()).toBe('7:30')
    expect(wrapper.find('[className="sunSet"]').text()).toBe('9:30')
  })

  it('Should shows proper Sun Rise and Sun Set', () => {
    wrapper = shallow(<SunLocation sunRise="7:30" sunSet="19:30" baseMoveToLeft={100} />)
    expect(wrapper.find('[className="sunRise"]').text()).toBe('7:30')
    expect(wrapper.find('[className="sunSet"]').text()).toBe('19:30')
  })
})
