import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";

const getDayOfWeek = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

const getFormattedDate = (date) => {
  const options = { month: "long", day: "numeric" }; 
  return date.toLocaleDateString(undefined, options);
};

const Temperature = () => {
  const [location, setLocation] = useState("Hanoi");
  const [temperature, setTemperature] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "81f663d1beb84a4fbb26619db6daf54e";
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`
          );
          const data = await response.json();
          const city = data.results[0]?.components?.city || "Unknown Location";
          setLocation(city);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('https://smartclock-mrh3center-1.onrender.com/weather');
        const data = await response.json();
        setTemperature(data.temperature || "No data");
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperature();

    const intervalId = setInterval(fetchTemperature, 10000); 

    return () => clearInterval(intervalId); 
  }, []);

  const currentDate = new Date();
  const dayOfWeek = getDayOfWeek(currentDate);
  const formattedDate = getFormattedDate(currentDate);

  return (
    <div className="w-full h-full bg-[#C9E6FF] rounded-xl p-4 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl">Weather</h1>
          <h2 className="text-lg">
            {dayOfWeek}, {formattedDate}
          </h2>
        </div>
        <div className="flex items-center gap-x-2">
          <HiLocationMarker />
          <h1 className="font-semibold">
            {loading ? "Loading..." : location}
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex pb-8 items-center justify-between">
        <img src="/public/weather.webp" className="w-[80px]" alt="" />
        <h1 className="text-7xl font-bold">{temperature}</h1>
      </div>
    </div>
  );
};

export default Temperature;
