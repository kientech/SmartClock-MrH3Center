import express from "express";
import cors from "cors";
import dgram from "dgram";
import { Readable } from "stream";

// UDP Configuration
const udpPort = 33333;
const udpHost = "localhost";

// Create Express app
const app = express();
const udpServer = dgram.createSocket("udp4");

// Store the latest weather data
let latestWeather = {
  temperature: "No data",
  humidity: "No data"
};

// Middleware configuration
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Client Connected to MrH3 Server!`);
  next();
});

// Handle UDP messages
udpServer.on("message", (msg, rinfo) => {
  const message = msg.toString();
  console.log(`UDP server received: ${message} from ${rinfo.address}:${rinfo.port}`);
  
  // Extract temperature and humidity from message
  const temperatureMatch = message.match(/Temperature: (\d+\.?\d*)°C/);
  const humidityMatch = message.match(/Humidity: (\d+\.?\d*)%/);

  if (temperatureMatch && humidityMatch) {
    latestWeather = {
      temperature: temperatureMatch[1] + "°C",
      humidity: humidityMatch[1] + "%"
    };
  }
});

// Start UDP server
udpServer.bind(udpPort, udpHost, () => {
  console.log(`UDP server listening on ${udpHost}:${udpPort}`);
});

// Function to generate fake temperature and humidity data
const generateFakeData = () => {
  const temperature = (Math.random() * 3 + 25).toFixed(1); // Between 25°C and 28°C
  const humidity = (Math.random() * 40 + 30).toFixed(1); // Between 30% and 70%
  return `Temperature: ${temperature}°C, Humidity: ${humidity}%`;
};

// Set up Server-Sent Events (SSE) endpoint
const clients = [];

// Function to broadcast weather updates to all SSE clients
const broadcastWeather = () => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(latestWeather)}\n\n`);
  });
};

// Set up SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const client = new Readable({
    read() {}
  });
  clients.push(client);
  
  client.pipe(res);

  // Remove client from the list on connection close
  req.on('close', () => {
    clients.splice(clients.indexOf(client), 1);
  });
});

// Send fake data every 10 seconds
setInterval(() => {
  const fakeData = generateFakeData();
  const udpClient = dgram.createSocket("udp4");
  udpClient.send(Buffer.from(fakeData), udpPort, udpHost, (err) => {
    udpClient.close();
    if (err) {
      console.error("Error sending UDP message", err);
    } else {
      console.log("Sent data:", fakeData);
    }
  });
}, 10000); // 10000 ms = 10 seconds

// Send weather updates every 10 seconds
setInterval(broadcastWeather, 10000); // 10000 ms = 10 seconds

// Endpoint to get the latest weather data
app.get('/weather', (req, res) => {
  res.json(latestWeather);
});

// Start HTTP server
const expressPort = 3001;
app.listen(expressPort, () => {
  console.log(`Server listening on port ${expressPort}`);
});
