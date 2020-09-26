import rootReducers from "../rootReducers";


describe('When we are testing rootReducers', () => {

  it('Should should return the default state as hello = Salam', () => {
    expect(rootReducers({hello: 'Salam'}, {type: undefined})).toEqual({hello: 'Salam'});
  })
});
