import React, { useEffect, useState } from 'react';
import { FETCH_EVENTS_URL } from '../config/constants';
import useFetch from '../hooks/useFetch';
import EventItem from './EventItem';
import './EventsList.css';

const EventsList = () => {
    const [state, setRequest] = useFetch();
    const [localState, setLocalState] = useState();
    useEffect( () => {
        setLocalState(state);
  }, [state])
    if (localState && localState.events) {
        const { events, page, totalPages, isError, isLoading } = localState;
        const lastPage = page === totalPages;
        return (
            <div>
                {isError && <div>Something went wrong, Please refresh the page ...</div>}
                {isLoading ? (
                    <div>Loading ...</div>
                    ) : (
                        <ul className="list">
                            {events.map((event, i) => <EventItem key={event.id} event={event} />)}
                            {!lastPage &&
                                <div
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => setRequest(`${FETCH_EVENTS_URL}&page=${page + 1}`)}
                                    className="event__btn event__btn--reverse"
                                >
                                    Click to Load more!
                                </div>
                            }
                        </ul>
                    )}
            </div>
        );
    }
    return null;
};

export default EventsList;
