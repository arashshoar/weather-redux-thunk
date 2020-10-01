jest.mock('../actions', () => {
  const rest = jest.requireActual('../actions');
  return ({
    ...rest,
    fetchLocations: jest.fn(),
    fetchWeather: jest.fn(),
    setCoords: jest.fn(),
  })
})

import { fetchLocations, getUsersLocation, getUserCurrentPosition, setCoords, fetchWeather } from "../actions";


fetchLocations.mockImplementation(jest.fn());

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;


function flushPormise() {
  return new Promise(resolve => setTimeout(resolve, 0))
}


describe('When we test actions', () => {

  it('When we call getUserCurrentPosition it returns a Promise', () => {
    expect(typeof getUserCurrentPosition().then).toEqual('function');
  });

  it('should getCurrentPosition called', () => {
    getUserCurrentPosition().then(() => {
      expect(mockGeolocation).toHaveBeenCalled();
    });
  })

  it ('', () => {
    getUsersLocation()()
      .then(() => {
        expect(fetchLocations).toHaveBeenCalled();
        expect(fetchWeather).toHaveBeenCalled();
        expect(setCoords).toHaveBeenCalled();
      });
  })

  xit ('', async () => {

    getUsersLocation()();
    await flushPormise();

    expect(fetchLocations).toHaveBeenCalled();
    expect(fetchWeather).toHaveBeenCalled();
    expect(setCoords).toHaveBeenCalled();

  });

});
