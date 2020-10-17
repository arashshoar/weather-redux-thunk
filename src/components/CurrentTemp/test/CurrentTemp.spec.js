import React from 'react'
import { mount } from 'enzyme'
import RootForTests from 'test-utilities/RootForTests'
import CurrentTemp from '../CurrentTemp'


describe('When we test SunMoon', () => {
  let wrapper

  const wrapperMount = (props) => mount(
    <RootForTests {...props}>
      <CurrentTemp />
    </RootForTests>
  )

  it('The component has render an instance of LocationAndDate', () => {
    wrapper = wrapperMount()
    expect(wrapper.find('LocationAndDate')).toHaveLength(1)
  })

  it('The component has render an instance of DescriptionAndTemp', () => {
    wrapper = wrapperMount()
    expect(wrapper.find('DescriptionAndTemp')).toHaveLength(1)
  })

  it('When user clicks on C button changes our units to Celcius', () => {
    wrapper = wrapperMount()

    wrapper.find('[className="celc notCurrent"]').simulate('click')
    expect(wrapper.find('[className="faren notCurrent"]')).toHaveLength(1)
    expect(wrapper.find('[className="celc false"]')).toHaveLength(1)
  })

  it('When user clicks on F button changes our units to Celcius', () => {
    wrapper = wrapperMount({ unitFC: 'c' })

    wrapper.find('[className="faren notCurrent"]').simulate('click')
    expect(wrapper.find('[className="faren false"]')).toHaveLength(1)
    expect(wrapper.find('[className="celc notCurrent"]')).toHaveLength(1)
  })

})
