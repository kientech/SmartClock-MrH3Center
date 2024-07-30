import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventPopup from './EventPopup'; 

const PopularEvent = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false); 

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4040/events/upcoming-event');
        const eventData = response.data.data;
        const eventTime = new Date(eventData.time).getTime();
        const currentTime = Date.now();

        setEvent(eventData);
        setLoading(false);

        if (eventData && !popupClosed && eventTime > currentTime) {
          setShowPopup(false);
        }
      } catch (error) {
        console.error('Error fetching upcoming event:', error);
        setLoading(false);
      }
    };

    fetchUpcomingEvent();

    const intervalId = setInterval(() => {
      fetchUpcomingEvent();
    }, 10000);

    return () => clearInterval(intervalId); 
  }, [popupClosed]); 

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); 
  };

  return (
    <div className="w-full h-full bg-white rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : event ? (
        <>
          <div className="py-3 px-4 flex items-center justify-between">
            <div className="flex">
              <img
                src={event?.image}
                className="w-[75px] h-[75px] rounded-lg object-cover"
                alt="EventName"
              />
              <div className="flex-col gap-y-4 px-3 items-center">
                <h1 className="font-semibold text-lg">{event?.title}</h1>
                <span className="inline-block py-1 px-4 rounded-lg bg-red-200 text-red-500">
                  {event?.tag}
                </span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gray-200">
              {/* Icon or Action */}
            </div>
          </div>
          <p className="px-4 font-base text-sm">{event.description}</p>
          <div className="h-1 w-[90%] bg-gray-100 rounded-md mx-auto my-2"></div>
          <div className="px-4 py-2 flex items-center justify-between">
            <h1 className="font-bold">{formatTime(event.time)}</h1>
            <h1 className="font-semibold">{formatDate(event.time)}</h1>
          </div>

          {showPopup && (
            <EventPopup
              event={event}
              onClose={() => {
                setShowPopup(false);
                setPopupClosed(true); 
              }}
            />
          )}
        </>
      ) : (
        <h1 className='font-bold text-lg p-4 text-red-400'>No upcoming events.</h1>
      )}
    </div>
  );
};

export default PopularEvent;
