import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import App from 'App';
import { localStorageMock, geolocationMock } from 'test-utilities/mocks';
import { weatherCurrentData } from "utilities/test-utilities/mockData/weatherCurrentData";

const mapData = require('utilities/test-utilities/mockData/mapData');

global.navigator.geolocation = geolocationMock;

Object.defineProperty(window, 'localStorage', {
  value: new localStorageMock(),
});

jest.mock('axios', () => {
  const mapData = require('../utilities/test-utilities/mockData/mapData');
  return {get: jest.fn(() => Promise.resolve(mapData))};
});

function flushPromise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

describe('When we are testing App component', () => {
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

  it('When we have weather data on localStorage it use the local storage data but map data has damaged stored data', async () => {
    window.localStorage.setItem('storedLocationData-121.98,37.31', {});
    window.localStorage.setItem('storedWeatherData37.31-121.98', JSON.stringify(weatherCurrentData));
    window.localStorage.setItem('storedWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()));
    const App = wrapper();
    await flushPromise();
    expect(getStore(App).currentWeatherData.currentWeatherData.dt).toBe(1601486785);
  });

  it('When we have both weather and map data on localStorage it use the local storage data', async () => {
    window.localStorage.setItem('storedLocationData-121.98,37.31', JSON.stringify(mapData));
    window.localStorage.setItem('storedWeatherData37.31-121.98', JSON.stringify(weatherCurrentData));
    window.localStorage.setItem('storedWeatherDataTime37.31-121.98', JSON.stringify(new Date().getTime()));
    const App = wrapper();
    await flushPromise();
    expect(getStore(App).currentWeatherData.currentWeatherData.dt).toBe(1601486785);
  });
});





























