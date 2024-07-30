import mongoose from "mongoose";

// Define the schema for the Event model
const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    time: {
      type: Date, // Use Date type instead of DateTime
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Event model
const Event = mongoose.model("Event", eventSchema);
export default Event;
