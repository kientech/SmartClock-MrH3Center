import Event from "../models/eventModel.js";
import express from "express";

const eventRouter = express.Router();

// route for create new blog
eventRouter.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.tag ||
      !req.body.description ||
      !req.body.image ||
      !req.body.time
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the fields!!!",
      });
    }
    const newEvent = {
      title: req.body.title,
      tag: req.body.tag,
      description: req.body.description,
      image: req.body.image,
      time: req.body.time,
    };
    const event = await Event.create(newEvent);
    return res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// route for get all events
eventRouter.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json({
      status: "success",
      length: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

eventRouter.get("/upcoming-event", async (req, res) => {
  try {
    const now = new Date();
    const upcomingEvent = await Event.findOne({ time: { $gte: now } }).sort({
      time: 1,
    });
    return res.status(200).json({
      status: "success",
      data: upcomingEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route for get a blog with id
eventRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    return res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// route for update a blog
eventRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      status: "success",
      data: event,
      message: "Updated blog successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// route for delete a blog
eventRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Delete blog successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default eventRouter;
