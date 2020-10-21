import React from 'react'
import { mount } from 'enzyme'
import Root from 'Root'
import App from 'App'
import { localStorageMock, geolocationMock } from 'test-utilities/mocks'
import { getApplicationBackground } from 'utilities/utilities'

jest.mock('../utilities/utilities', () => {
  const rest = jest.requireActual('../utilities/utilities')
  return ({
    ...rest,
    getApplicationBackground: jest.fn(),
  })
})

jest.mock('axios')

global.navigator.geolocation = geolocationMock

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.append(root)
const currentTemp = document.createElement('div')
currentTemp.setAttribute('class', 'CurrentTemp_currentTemp')
currentTemp.style.minHeight = '100px'

describe('When we are testing App component', () => {
  let wrapper

  wrapper = () => mount(<Root><App/></Root>)

  it('Should run the test file', () => {
    expect(App).toBeDefined()
  })

  it('Should have an instance of CurrentTemp component', () => {
    expect(wrapper().find('CurrentTemp')).toHaveLength(1)
  })

  it('App component has it\'s own structure ', () => {
    const App = wrapper()
    expect(App.find('[className="app"]')).toHaveLength(1)
    expect(App.find('[className="asideContainer"]')).toHaveLength(1)
    expect(App.find('[className="currentTempContainer"]')).toHaveLength(1)
    expect(App.find('Aside')).toHaveLength(1)
    expect(App.find('CurrentTemp')).toHaveLength(1)
    expect(App.find('Advertisement')).toHaveLength(1)
    expect(App.find('[className="componentsSetOne"]')).toHaveLength(1)
    expect(App.find('[className="componentsSetTwo"]')).toHaveLength(1)
    expect(App.find('Wind')).toHaveLength(1)
    expect(App.find('Details')).toHaveLength(1)
    expect(App.find('GoogleMap')).toHaveLength(1)
    expect(App.find('SunMoon')).toHaveLength(1)
    expect(App.find('Precipitation')).toHaveLength(1)
    expect(App.find('Forecast')).toHaveLength(1)
  })

  it('When the App mounted it got it\' own background', () => {
    wrapper()
    expect(getApplicationBackground).toHaveBeenCalled()
  })
})






























