import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    role: {
  type: String,
  enum: ["user", "admin", "police"],
  default: "user"
},

    emergencyContacts: [contactSchema],

    location: {
      latitude: Number,
      longitude: Number
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);