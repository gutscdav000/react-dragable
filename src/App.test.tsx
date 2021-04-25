import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdaptor from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdaptor()});

test('renders withoutt crashing', () => {
  const wrapper = shallow( <App />);
  //console.log(wrapper.debug()); //<- shows what is rendering
  expect(wrapper.exists()).toBe(true);
});

test('data test', () => {
  const wrapper = shallow( <App />);
  const appComponent = wrapper.find("[data-test='component-app']")
  expect(appComponent.length).toBe(1);
});