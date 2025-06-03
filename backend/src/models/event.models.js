import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },

    organizerDetails: {
      type: String,
      required: true,
    },

    images: {
      type: [String], // Array of image URLs
      required: true, // At least one image required
      validate: [arr => arr.length > 0, "At least one image is required"],
    },

    displayStatus: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
