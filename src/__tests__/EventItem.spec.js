import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import "../configTests";
import EventItem from '../components/EventItem';
import { event } from '../__mocks__/mockedEvent';

describe('EventItem component', () => {
    it('Renders without a crash', () => {
        const wrapper = shallow(<EventItem event={event} />);
        expect(wrapper).toBeDefined();
    });
    it('Should match the snapshot', () => {
        const tree = renderer.create(<EventItem  event={event} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('Should handle not existing data in footer', () => {
        const modifiedEvent = {...event, promoter: null, classifications: [{}]}
        const wrapper = shallow(<EventItem event={modifiedEvent} />)
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div[data-test="segment"]').exists()).toBeFalsy();
        expect(wrapper.find('div[data-test="promoter"]').exists()).toBeFalsy();
    })
    it('Should show footer when "More info" gets clicked', () => {
        const wrapper = shallow(<EventItem event={event} />);
        expect(wrapper.find('.event__footer').exists()).toBeFalsy();
        wrapper.find('button').simulate('click');
        expect(wrapper.find('.event__footer').exists()).toBeTruthy();
    })
    it('Should hide footer when "Hide Info" gets clicked', () => {
        const wrapper = shallow(<EventItem event={event} />);
        wrapper.find('button').simulate('click');
        wrapper.find('.event__footer').find('button').simulate('click');
        expect(wrapper.find('.event__footer').exists()).toBeFalsy();
    })
})
