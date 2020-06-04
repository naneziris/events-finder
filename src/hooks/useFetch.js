import { useState, useEffect, useReducer } from 'react';
import { FETCH_EVENTS_URL } from '../config/constants';
import { dataFetchReducer } from '../reducers/dataFetchReducer';

/*
 * useFetch hook
 * @returns {object} state { isLoading,isError,events,totalPages,page}
 * @returns {function} setRequest
 */
export const useFetch = () => {
    const [request, setRequest] = useState(FETCH_EVENTS_URL);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        events: [],
        totalPages: null,
        page: 0,
      });
    useEffect( () => {
        const fetchData = (async () => {
            dispatch({ type: 'GET_EVENTS_LOADING' });
            try {
                const result = await fetch(request);
                const eventsData = await result.json();
                const events = eventsData._embedded.events;
                 const totalPages = eventsData.page.totalPages;
                const page = eventsData.page.number;
                dispatch({ type: 'GET_EVENTS_SUCCESS', payload: {events, totalPages, page} });
            } catch (err) {
                console.error(err);
                dispatch({ type: 'GET_EVENTS_FAILURE'});
            }
        });
        fetchData();
  }, [request])
  return [state, setRequest]
};

export default useFetch;
