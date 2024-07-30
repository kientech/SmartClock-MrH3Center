import React, { useState, useEffect } from "react";
import { HiOutlineEye, HiOutlineDotsVertical } from "react-icons/hi";
import EventModal from "./EventModal";
import EditEventModal from "./EditEventModal";
import OptionsModal from "./OptionsModal"; // Import the OptionsModal
import axios from "axios";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();

    const intervalId = setInterval(() => {
      fetchEvents();
    }, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:4040/events");
      const currentTime = new Date();

      const upcomingEvents = res.data.data.filter((event) => new Date(event.time) > currentTime);

      setEvents(upcomingEvents);
    } catch (err) {
      console.log("🚀 ~ axios.get ~ err:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEventModal = () => {
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenOptionsModal = (event) => {
    setSelectedEvent(event);
    setIsOptionsModalOpen(true);
  };

  const handleCloseOptionsModal = () => {
    setIsOptionsModalOpen(false);
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`https://smartclock-mrh3center.onrender.com/events/${selectedEvent._id}`);
      fetchEvents(); // Refresh events list after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      handleCloseOptionsModal();
    }
  };

  const handleEditEvent = () => {
    handleCloseOptionsModal();
    handleOpenEditModal();
  };

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => {
      const currentTime = new Date();
      const filteredEvents = prevEvents.filter((event) => new Date(event.time) > currentTime);

      return [...filteredEvents, newEvent];
    });
  };

  const handleSaveEdit = () => {
    fetchEvents(); // Refresh events list after editing
    handleCloseEditModal();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="w-full h-full bg-[#F4DDFF] rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-4">Events</h1>
        <HiOutlineEye size={40} className="pr-4" />
      </div>

      <div className="px-4">
        {events &&
          events.map((event) => (
            <div
              key={event._id}
              className="flex items-center justify-between gap-y-6"
            >
              <div className="flex items-center gap-y-8">
                <h1 className="text-xl font-semibold w-[100px]">
                  {formatTime(event.time)}
                </h1>
                <span className="px-8">|</span>
                <h1 className="font-base text-xl">{event.title}</h1>
              </div>
              <HiOutlineDotsVertical
                className="cursor-pointer"
                onClick={() => handleOpenOptionsModal(event)}
              />
            </div>
          ))}
      </div>
      <button
        className="block mb-auto px-4 py-2 bg-blue-300 rounded-lg w-[80%] mx-auto mt-6 text-white"
        onClick={handleOpenEventModal}
      >
        Create new event
      </button>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        onEventCreated={handleEventCreated}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        event={selectedEvent}
        onSave={handleSaveEdit}
      />
      <OptionsModal
        isOpen={isOptionsModalOpen}
        onClose={handleCloseOptionsModal}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Events;
