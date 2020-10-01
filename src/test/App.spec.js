import React from 'react';
import { shallow, mount} from 'enzyme';
import App from '../App';
import Root from 'Root';

// const mapData = require('./mapData');
import { mapDataString } from './mapDataString';
import { weatherCurrentData } from "./weatherCurrentData";
// import { mapData } from './mapData'
import { weatherCurrentString } from './weatherCurrentString';
const mapData = require('./mapData');

const mockGeolocation = {
  getCurrentPosition: jest
    .fn()
    .mockImplementationOnce(
      (res, rej, options) => {
        rej(new Error('User denied our permission to access their location'));
      }
    )
    .mockImplementation(
      (res, rej, options) => {
        res({coords: {latitude: 37.3118288, longitude: -121.9770887}});
      }
    )
};

global.navigator.geolocation = mockGeolocation;

// browser mocks
const localStorageMock = (function() {
  let store = {}
  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    },
  }
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

jest.mock('axios', () => {
  const mapData = require('./mapData');
  return {get: jest.fn(() => Promise.resolve(mapData))};
});

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing App component', () => {
  // window.localStorage.setItem("AAA", "In Storage ast")

  let wrapper;

  const getStore = App => App.find('Provider').prop('store').getState();

  wrapper = () => mount(<Root><App/></Root>);

  it('Should run the test file', () => {
    expect(App).toBeDefined();
  });

  it('Wrapper should have one child and when user denied application to get their location it should have New York as location', async () => {
    const App = wrapper();
    await flushPromise();
    expect(getStore(App).coords).toMatch('-73.9808,40.7648');
    expect(App).toHaveLength(1);
  });

  it('When user let application to get their location it should have San Jose as location', async () => {
    const App = wrapper();
    await flushPromise();
    expect(getStore(App).coords).toMatch('-121.9770887,37.3118288');
  });

  it('When we have weather data on localStorage it use the local storage data', async () => {
    // window.localStorage.setItem('storedLocationData-121.98,37.31', JSON.stringify(mapData));
    window.localStorage.setItem('storedLocationData-121.98,37.31', {});
    window.localStorage.setItem('storedWeatherData37.31-121.98', JSON.stringify(weatherCurrentData));
    window.localStorage.setItem('storedWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()));
    const App = wrapper();
    await flushPromise();
    expect(getStore(App).currentWeatherData.currentWeatherData.dt).toBe(1601486785);
  });
});





























