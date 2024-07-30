import React, { useState, useEffect } from "react";

const Humidity = () => {
    const [humidity, setHumidity] = useState("")

    useEffect(() => {
        const fetchTemperature = async () => {
          try {
            const response = await fetch('http://localhost:3001/weather');
            const data = await response.json();
            setHumidity(data.humidity || "No data");
          } catch (error) {
            console.error("Error fetching temperature data:", error);
          }
        };
    
        fetchTemperature();
    
        const intervalId = setInterval(fetchTemperature, 10000); 
    
        return () => clearInterval(intervalId); 
      }, []);
  return (
    <div className="w-full h-full bg-[#BDFFC4] rounded-xl p-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Humidity</h1>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <img src="/public/humidity.png" className="w-[30px]" alt="" />
        <h1 className="text-2xl font-bold text-right">{humidity}</h1>
      </div>
    </div>
  );
};

export default Humidity;
