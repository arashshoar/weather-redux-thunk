import React from 'react'
import { shallow, mount } from 'enzyme'

import DescriptionAndTemp from '../DescriptionAndTemp'

describe('When we test DescriptionAndTemp', () => {
  let wrapper
  let setUnitFCMock = jest.fn()

  const compProps = (unitFC = 'f') => ({
    description: 'Clear',
    maxTemp: 14,
    minTemp: 1,
    currentTemp: 12,
    unitFC,
    setUnitFC: setUnitFCMock,
    isDay: true,
    descriptionFirst: 'clear sky'
  })

  Object.defineProperty(window, 'beforeunload', {
    value: jest.fn(),
  })

  wrapper = shallow(<DescriptionAndTemp {...compProps()} />)

  it('component has it\'s structure', () => {
    expect(wrapper.find('[className="descriptionAndTemp"]')).toHaveLength(1)
  })

  it('shows us information base on Farenheit unit by default', () => {
    expect(wrapper.find('[className*="notCurrent"]').html()).toBe('<div class="celc notCurrent">C</div>')
  })

  it('shows us information base on Celcius it the unitFC set\'s as "c"', () => {
    wrapper = shallow(<DescriptionAndTemp {...compProps('c')} />)
    expect(wrapper.find('[className*="notCurrent"]').html()).toBe('<div class="faren notCurrent">F</div>')
  })

  it('when current unit it is Farenheit if we click on C button it\' going to change to Cetcius', () => {
    wrapper = mount(<DescriptionAndTemp {...compProps()} />)
    expect(wrapper.props().unitFC).toEqual('f')
    wrapper.find('[className*="celc"]').simulate('click')
    expect(setUnitFCMock).toHaveBeenCalledWith('c')
  })

  it('when current unit it is Celcius if we click on C button it\' going to change to Farenheit', () => {
    wrapper = mount(<DescriptionAndTemp {...compProps('c')} />)
    expect(wrapper.props().unitFC).toEqual('c')
    wrapper.find('[className*="faren"]').simulate('click')
    expect(setUnitFCMock).toHaveBeenCalledWith('f')
  })
})
