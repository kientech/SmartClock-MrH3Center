import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EventModal = ({ isOpen, onClose, onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const localDate = new Date(time);
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    const utcTime = utcDate.toISOString();

    const eventData = {
      title,
      tag,
      description,
      time: utcTime, 
      image,
    };

    console.log(eventData);

    try {
      const response = await axios.post(
        "https://smartclock-mrh3center.onrender.com/events",
        eventData
      );
      toast.success("Create Event Successfully!");
      onEventCreated(response.data.data); // Pass new event data to parent
      onClose();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-100 rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-green-50 focus:border-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="tag">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-green-50 focus:border-green-500"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-green-50 focus:border-green-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="time">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="time"
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-green-50 focus:border-green-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Upload Image
            </label>
            {/* Uncomment if you want to handle file uploads */}
            {/* <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full"
              onChange={handleImageUpload}
            /> */}
            <input
              type="text"
              id="image"
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-green-50 focus:border-green-500"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-900 text-white rounded-md px-4 py-2"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
