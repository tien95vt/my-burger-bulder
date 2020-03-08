import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NabigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
  });

  it('Should render 2 <NavigationItem /> elements', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('Should render <Order /> element right', () => {
    expect(wrapper.contains(<NavigationItem link="/orders" >Orders</NavigationItem>)).toEqual(true);
  });
});
