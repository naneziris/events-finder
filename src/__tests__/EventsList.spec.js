/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import "../configTests";
import EventsList from '../components/EventsList.jsx';

describe('EventsList component', () => {
    it('Renders without a crash', () => {
        const wrapper = shallow(<EventsList />);
        expect(wrapper).toBeDefined();
    });
})
