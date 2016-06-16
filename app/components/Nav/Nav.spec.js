import React from 'react';
import { Nav } from './Nav';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';

describe('<Hero />', () => {
  it('has a h1 element', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
