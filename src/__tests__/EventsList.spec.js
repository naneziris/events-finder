/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import "../configTests";
import * as useFetchModule from '../hooks/useFetch';
import EventsList from '../components/EventsList.jsx';
import {event} from '../__mocks__/mockedEvent';

const ERROR_MSG = 'Something went wrong, Please refresh the page ...';
const LOADING_MSG = 'Loading ...';

const mockedState = {
    events: [event],
    isError: false,
    isLoading: false,
    page: 0,
    totalPages: 1,
}

const mockedStateError = {
    events: [],
    isError: true,
    isLoading: false,
    page: undefined,
    totalPages: undefined,
}

const mockedStateLoading = {
    events: [],
    isError: false,
    isLoading: true,
    page: undefined,
    totalPages: undefined,
}

const setRequest = jest.fn();

const spy = jest.spyOn(useFetchModule, 'default')


describe('EventsList component', () => {
    beforeEach(() => {
        spy.mockReturnValue([mockedState, setRequest]);
    });

    afterEach(() => {
        useFetchModule.default.mockReset();
    });
    it('Should display the events', () => {
        let wrapper;
        act(() => {
            wrapper = mount(<EventsList />);
        });
        wrapper.update();
        expect(wrapper.find('EventItem').exists()).toBeTruthy();
        expect(wrapper.find('EventItem')).toHaveLength(1);
    });
    it('Should display the error message if there is an error', () => {
        spy.mockReturnValue([mockedStateError, setRequest]);
        let wrapper;
        act(() => {
            wrapper = mount(<EventsList />);
        });
        wrapper.update();
        expect(wrapper.find('EventItem').exists()).toBeFalsy();
        expect(wrapper.find('div').text()).toEqual(ERROR_MSG);
    });
    it('Should display the loading text', () => {
        spy.mockReturnValue([mockedStateLoading, setRequest]);
        let wrapper;
        act(() => {
            wrapper = mount(<EventsList />);
        });
        wrapper.update();
        expect(wrapper.find('EventItem').exists()).toBeFalsy();
        expect(wrapper.find('div').first().children().text()).toEqual(LOADING_MSG);
    });
})
