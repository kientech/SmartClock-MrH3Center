import React from 'react';

const EventPopup = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-200 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Upcoming Event</h2>
        <p className="text-lg font-semibold">{event.title}</p>
        <p className="mb-4">{event.description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventPopup;
