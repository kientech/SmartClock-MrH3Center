import mongoose from "mongoose";
import express from "express";
import eventRouter from "./routes/eventsRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Smart Clock - MrH3 Center");
});

app.use("/events", eventRouter);

mongoose
  .connect(
    "mongodb+srv://duongtrungkiendev:duongtrungkiendev@cluster0.n3l6wri.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(4040, () => {
      console.log("App listening on port 4040 ...");
    });
    console.log("Smart Clock connected to database");
  });
