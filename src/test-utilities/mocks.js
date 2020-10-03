
export class localStorageMock {
  store = {};

  getItem = (key) => {
    return this.store[key] || null;
  }

  setItem = (key, value) => {
    this.store[key] = value.toString();
  }

  // // if you need you removeItem and clear methods as well, you can uncomment these
  // removeItem = (key) => {
  //   delete this.store[key];
  // }
  //
  // clear = () => {
  //   this.store = {};
  // }
}

export const geolocationMock = {
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
