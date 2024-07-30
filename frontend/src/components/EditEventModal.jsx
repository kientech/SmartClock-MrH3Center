import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(event?.time)

  useEffect(() => {
    if (isOpen && event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      if (event.time) {
        const localTime = new Date(event.time);
        const offsetTime = new Date(localTime.getTime() - localTime.getTimezoneOffset() * 60000);
        setTime(offsetTime.toISOString().slice(0, 16));
      }
    }
  }, [isOpen, event]);

  const handleSave = async () => {
    try {
      const selectedTime = new Date(time);
      const utcTime = new Date(selectedTime.getTime() + selectedTime.getTimezoneOffset() * 60000);
      
      await axios.patch(`http://127.0.0.1:4040/events/${event._id}`, {
        title,
        description,
        time: utcTime,
      });
      onSave(); 
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2">Time</label>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
