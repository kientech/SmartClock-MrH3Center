import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "2024-07-01", temperature: 30, humidity: 70 },
  { date: "2024-07-02", temperature: 32, humidity: 65 },
  { date: "2024-07-03", temperature: 33, humidity: 60 },
  { date: "2024-07-01", temperature: 30, humidity: 70 },
  { date: "2024-07-02", temperature: 32, humidity: 65 },
  { date: "2024-07-03", temperature: 33, humidity: 60 },
  { date: "2024-07-01", temperature: 30, humidity: 70 },
  { date: "2024-07-02", temperature: 32, humidity: 65 },
  { date: "2024-07-03", temperature: 33, humidity: 60 },
];

const CustomizedTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className="bg-white border rounded-lg p-2 shadow-lg">
      
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.stroke }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Visualization = () => {
  return (
    <div className="w-full h-full bg-[#FEEA7F] rounded-xl p-2">
        <h1 className="font-bold text-2xl p-4">Visualization</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="date" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip content={<CustomizedTooltip />} />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ stroke: '#ff7300', strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#387908"
            strokeWidth={2}
            dot={{ stroke: '#387908', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visualization;
