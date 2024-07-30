import React from "react";

const ViewAllEventsModal = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96 max-h-[80%] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event._id} className="mb-4">
                <h3 className="font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                <p>{new Date(event.time).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllEventsModal;
