import React from 'react'
import { mount } from 'enzyme'
import Root from 'Root'
import App from 'App'
import { localStorageMock, geolocationMock } from 'test-utilities/mocks'
import { getBackgroundsSrc } from '../utilities/utilities'

jest.mock('../utilities/utilities', () => {
  const rest = jest.requireActual('../utilities/utilities')
  return ({
    ...rest,
    getBackgroundsSrc: jest.fn(),
    getUsersLocation: jest.fn(),
  })
})

jest.mock('axios')

global.navigator.geolocation = geolocationMock

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
})

describe('When we are testing App component', () => {
  let wrapper

  wrapper = () => mount(<Root><App/></Root>)

  it('Should run the test file', () => {
    expect(App).toBeDefined()
  })

  it('Should have an instance of CurrentTemp component', () => {
    expect(wrapper().find('CurrentTemp')).toHaveLength(1)
  })

  it('App component has it\'s own grid structure ', () => {
    const App = wrapper()
    expect(App.find('[className="app"]')).toHaveLength(1)
    expect(App.find('[className="asideContainer"]')).toHaveLength(1)
    expect(App.find('[className="currentTempContainer"]')).toHaveLength(1)
    expect(App.find('[className="links"]')).toHaveLength(1)
    expect(App.find('[className="componentsSetOne"]')).toHaveLength(1)
    expect(App.find('[className="componentsSetTwo"]')).toHaveLength(1)
  })

  it('When the App mounted it got it\' own background', () => {
    wrapper()
    expect(getBackgroundsSrc).toHaveBeenCalled()
  })
})






























