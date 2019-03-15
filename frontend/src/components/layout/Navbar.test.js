import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Navbar />', () => {
    it('Renders without crashing', () => {
        shallow(<Navbar />)
    })
});