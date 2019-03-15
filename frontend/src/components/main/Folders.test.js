import React from 'react';
import { shallow } from 'enzyme';
import Folders from './Folders';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('<Folders />', () => {
    it('Renders without crashing', () => {
        shallow(<Folders />)
    })
});