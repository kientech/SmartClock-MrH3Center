import React from "react";
import Calendar from "./components/Calendar";
import Clock from "./components/Clock";
import PopularEvent from "./components/PopularEvent";
import Visualization from "./components/Visualization";
import Temperature from "./components/Temperature";
import Events from "./components/Events";
import Humidity from "./components/Humidity";

function App() {
  return (
    <div className="w-[90%] my-16 mx-auto grid gap-y-5 grid-cols-1 md:grid-cols-6 md:grid-rows-6 md:gap-5">
      <div className="md:row-span-3 md:col-span-2">
        <Calendar />
      </div>
      <div className="md:row-span-4 md:col-span-2">
        <Clock />
      </div>
      <div className="md:row-span-2 md:col-span-2">
        <PopularEvent />
      </div>
      <div className="md:col-start-1 md:row-span-3 md:col-span-2">
        <Visualization />
      </div>
      <div className="md:col-start-3 md:row-span-2 md:col-span-2">
        <Temperature />
      </div>
      <div className="md:col-start-5 md:col-span-2 md:row-start-3 md:row-span-3">
        <Events />
      </div>
      <div className="md:col-start-5 md:col-span-2 md:row-span-1">
        <Humidity />
      </div>
    </div>
  );
}

export default App;
