import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Register />', () => {
    it('Renders without crashing', () => {
        shallow(<Register />)
    })
});