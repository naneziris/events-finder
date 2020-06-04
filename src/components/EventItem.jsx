import React, { useState } from 'react';
import _filter from 'lodash/filter';
import './EventsList.css';

const EventItem = ({event}) => {
    const { name, id, url, images, dates, classifications, promoter } = event;
    const [showMore, setShowMore] = useState(false);
    const CTAlabel = !showMore ? 'More Info' : 'Hide Info';
    const eventOpenExtraClass = showMore ? "open" : '';

    const eventImage = _filter(images, {width: 640, height: 360})[0].url;
    const eventDate = dates.start.localDate;
    const { segment, genre, subGenre } = classifications[0];
    return (
        <li className={`event ${eventOpenExtraClass}`}>
            <div className="event__container">
                <div className="event__media">
                    <img src={eventImage} alt={name} />
                </div>
                <div className="event__body">
                    <h2 className="event__title">{name}</h2>
                    <h5 className="event__date">Date: {eventDate}</h5>
                    <button className="event__btn" type="button" data-id={id} onClick={()=> setShowMore(!showMore)}>{CTAlabel}</button>
                </div>
            </div>
            {showMore &&(
                <div className="event__footer">
                    <div>
                        <h4>Event website</h4>
                        <a href={url} target="_blank" rel="noopener noreferrer" >Click here</a>
                    </div>
                    <div>
                        <h4>Event type:</h4>
                        <span>{segment.name} ({genre.name}, {subGenre.name})</span>
                    </div>
                    <div>
                        <h4>Promoter:</h4>
                        <div>{promoter.name}<br />{promoter.description}</div>
                    </div>
                    <button className="event__btn event__btn--small" type="button" data-id={id} onClick={()=> setShowMore(!showMore)}>{CTAlabel}</button>

                </div>
            )}
        </li>
    );
};

export default EventItem;
