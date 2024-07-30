import React, { useState, useEffect } from "react";
import { HiOutlineClock, HiOutlineMicrophone, HiOutlineVolumeUp } from "react-icons/hi";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  // const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="w-full h-full bg-[#FFCEBA] rounded-xl">
      <div className="flex justify-between items-center pr-4">
        <h1 className="font-bold text-2xl p-4">Clock</h1>
        <HiOutlineClock size={30} />
      </div>

      <div className="font-bold text-4xl text-center my-4 flex items-center justify-evenly">
        <h2 className="text-5xl">{hours}</h2>
        <span className="py-4">:</span>
        <h2 className="text-5xl">{minutes}</h2>
      </div>

      <div className="w-[80%] h-1 rounded-lg mx-auto bg-gray-300"></div>
      <div className="my-2">
        <h1 className="font-bold text-xl p-4">Prediction</h1>
        <div className="w-[90%] h-[100px] bg-gray-100 rounded-lg mx-auto"></div>
      </div>

      <div className="mb-auto mt-6 flex items-center justify-evenly">
        <div className="p-4 rounded-full bg-white">
            <HiOutlineMicrophone size={20}/>
        </div>
        <div className="p-4 rounded-full bg-white">
            <HiOutlineVolumeUp size={20}/>
        </div>
      </div>
    </div>
  );
};

export default Clock;
