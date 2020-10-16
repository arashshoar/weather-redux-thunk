import React from 'react'
import { mount } from 'enzyme'
import SunMoon from '../SunMoon'
import RootForTests from 'test-utilities/RootForTests'
import { currentWeatherDataForAxios } from 'utilities/test-utilities/mockData/currentWeatherDataForAxios'

describe('When we test SunMoon', () => {
  let wrapper


  it('When application is getting data from web services the component shows loading instead of information', () => {
    wrapper = mount(
      <RootForTests>
        <SunMoon />
      </RootForTests>
    )
    expect(wrapper.find('[className="tableContainer"]').find('div').at(0).text()).toContain('loading')
  })

  it('as current time (dt) 1595 seconds greater than sunRise', () => {
    currentWeatherDataForAxios.data.sys.sunrise = 1602857831
    currentWeatherDataForAxios.data.sys.sunset = 1602898148
    currentWeatherDataForAxios.data.timezone = -25200
    currentWeatherDataForAxios.data.dt = '1602859426'

    wrapper = mount(
      <RootForTests currentWeatherData={currentWeatherDataForAxios.data}>
        <SunMoon />
      </RootForTests>
    )
    expect(wrapper.find('SunLocation')).toHaveLength(1)
  })


  it('as current time (dt) is one second greater than sunset it is going to show MoonIcon', () => {
    currentWeatherDataForAxios.data.sys.sunrise = 1602857831
    currentWeatherDataForAxios.data.sys.sunset = 1602898148
    currentWeatherDataForAxios.data.timezone = -25200
    // because dt is one second more than sunset it is going to show MoonIcon
    currentWeatherDataForAxios.data.dt = 1602898148 + 1

    wrapper = mount(
      <RootForTests currentWeatherData={currentWeatherDataForAxios.data} >
        <SunMoon />
      </RootForTests>
    )
    expect(wrapper.find('MoonIcon')).toHaveLength(1)
  })

})
