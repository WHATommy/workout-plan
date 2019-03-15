import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Dashboard  />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard />)
    })
});