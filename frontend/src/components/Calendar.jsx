import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import axios from "axios"; 

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]); 

  useEffect(() => {
    // Fetch events data from your API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://smartclock-mrh3center.onrender.com/events");
        // Process and store event dates
        setEvents(response.data.map(event => new Date(event.date)));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between items-center">
          <span className="block text-lg font-bold">
            {format(currentMonth, dateFormat)}
          </span>
          <div className="">
            <button onClick={prevMonth} className="text-gray-500 hover:text-gray-900">
              <HiChevronLeft size={25} />
            </button>
            <button onClick={nextMonth} className="text-gray-500 hover:text-gray-900">
              <HiChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium text-gray-500" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isCurrentDay = isSameDay(day, selectedDate);
        const hasEvent = events.some(event => isSameDay(event, day));

        days.push(
          <div
            className={`block p-2 text-center cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? "text-gray-300 rounded-full"
                : isCurrentDay
                ? "bg-black text-white rounded-full"
                : hasEvent
                ? "bg-gray-400 text-white rounded-full" // Gray background for days with events
                : "text-gray-900"
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="bg-[#C9FFE9] p-4 rounded-2xl">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
