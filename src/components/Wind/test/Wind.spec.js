import React from 'react'
import { mount } from 'enzyme'
import Wind from '../Wind'
import RootForTests from 'test-utilities/RootForTests'
import { currentWeatherDataForAxios } from 'utilities/test-utilities/mockData/currentWeatherDataForAxios'

describe('When we test SunMoon', () => {
  let wrapper

  it('When application is getting data from web services the component shows loading instead of information', () => {

    wrapper = mount(
      <RootForTests>
        <Wind/>
      </RootForTests>
    )

    expect(wrapper.find('[className="wind"]').text()).toContain('loading')
  })


  it('When application is getting data from web services the component shows loading instead of information', () => {

    currentWeatherDataForAxios.data.wind.speed = 100
    currentWeatherDataForAxios.data.main.pressure = 500

    wrapper = mount(
      <RootForTests currentWeatherData={currentWeatherDataForAxios.data}>
        <Wind/>
      </RootForTests>
    )

    expect(wrapper.find('[className="wind"]').text()).toContain('100 mph')
    expect(wrapper.find('[className="pressure"]').text()).toContain('500 inches')
  })
})
