import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Login />', () => {
    it('Renders without crashing', () => {
        shallow(<Login />)
    })
});