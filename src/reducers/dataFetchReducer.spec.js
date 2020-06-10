import {dataFetchReducer} from './dataFetchReducer';
import mockedEvent from '../__mocks__/mockedEvent';

const initialState = {
    events: [],
}
describe('dataFetchReducer reducer', () => {
    it('Should return right values for GET_EVENTS_LOADING', () => {
        const action = {
            type: 'GET_EVENTS_LOADING',
        };
        const state = dataFetchReducer(initialState, action);
        expect(state.isLoading).toEqual(true);
        expect(state.isError).toEqual(false);
        expect(state.totalPages).toEqual(undefined);
        expect(state.page).toEqual(undefined);
        expect(state.events).toEqual([]);
    });
    it('Should return right values for GET_EVENTS_SUCCESS', () => {
        const action = {
            type: 'GET_EVENTS_SUCCESS',
            payload: {
                events: [mockedEvent ],
                page: 0,
                totalPages: 1,
            }
        };
        const state = dataFetchReducer(initialState, action);
        expect(state.isLoading).toEqual(false);
        expect(state.isError).toEqual(false);
        expect(state.totalPages).toEqual(1);
        expect(state.page).toEqual(0);
        expect(state.events).toEqual([mockedEvent]);
    });
    it('Should return right values for GET_EVENTS_FAILURE', () => {
        const action = {
            type: 'GET_EVENTS_FAILURE',
        };
        const state = dataFetchReducer(initialState, action);
        expect(state.isLoading).toEqual(false);
        expect(state.isError).toEqual(true);
        expect(state.totalPages).toEqual(undefined);
        expect(state.page).toEqual(undefined);
        expect(state.events).toEqual([]);
    });
    it('Should return state as default', () => {
        const action = {};
        const state = dataFetchReducer(initialState, action);
        expect(state.isLoading).toEqual(undefined);
        expect(state.isError).toEqual(undefined);
        expect(state.totalPages).toEqual(undefined);
        expect(state.page).toEqual(undefined);
        expect(state.events).toEqual([]);
    });
});
