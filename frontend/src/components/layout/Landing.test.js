import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Landing />', () => {
    it('Renders without crashing', () => {
        shallow(<Landing />)
    })
});