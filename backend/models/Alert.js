import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    location: {
      latitude: Number,
      longitude: Number
    },

    // ✅ ADD THIS (FIX)
    locationName: {
      type: String,
      default: "Unknown Location"
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED"],
      default: "ACTIVE"
    },

    message: {
      type: String,
      default: "Emergency SOS Triggered"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Alert", alertSchema);