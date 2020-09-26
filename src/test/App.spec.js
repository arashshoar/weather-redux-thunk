import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('When we are testing App component', () => {

  let wrapper;

  wrapper = shallow(<App />);

  it('Should run the test file', () => {
    expect(App).toBeDefined();
  })

  it('Wrapper should have one child', () => {
    expect(wrapper).toHaveLength(1)
  })
});
