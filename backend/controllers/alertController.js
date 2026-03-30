import Alert from "../models/Alert.js";
import axios from "axios"; // ✅ ADDED

let io;

// SET SOCKET INSTANCE FROM SERVER
export const setSocket = (socketIo) => {
  io = socketIo;
};


// ===============================
// CREATE SOS ALERT
// ===============================

export const createAlert = async (req, res) => {
  try {

    const { latitude, longitude } = req.body;

    // ✅ VALIDATION
    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Location is required"
      });
    }

    // ✅ PREVENT SPAM (cooldown 10 sec)
    const lastAlert = await Alert.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    if (lastAlert) {
      const diff = Date.now() - new Date(lastAlert.createdAt).getTime();

      if (diff < 10000) {
        return res.status(429).json({
          message: "Please wait before triggering SOS again"
        });
      }
    }

    // ✅ GET FULL ADDRESS FROM LAT/LNG
    let locationName = "Unknown Location";

    try {
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      locationName = geoRes.data.display_name;

    } catch (err) {
      console.log("Geo error:", err.message);
    }

    // ✅ CREATE ALERT
    const alert = await Alert.create({
      userId: req.user._id,
      location: {
        latitude,
        longitude
      },
      locationName, // ✅ NEW FIELD
      status: "ACTIVE"
    });

    // ✅ EMIT REALTIME EVENT (structured)
    if (io) {
      io.emit("newAlert", {
        _id: alert._id,
        userId: alert.userId,
        location: alert.location,
        locationName: alert.locationName, // ✅ ADDED
        status: alert.status,
        createdAt: alert.createdAt
      });
    }

    res.status(201).json({
      message: "SOS Alert Triggered Successfully 🚨",
      alert
    });

  } catch (error) {

    console.error("SOS ERROR:", error);

    res.status(500).json({
      message: "Failed to trigger SOS"
    });

  }
};


// ===============================
// GET ACTIVE ALERTS (POLICE)
// ===============================

export const getActiveAlerts = async (req, res) => {
  try {

    const alerts = await Alert.find({ status: "ACTIVE" })
      .populate("userId", "name phone email");

    res.json(alerts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// USER ALERT HISTORY
// ===============================

export const getUserAlerts = async (req, res) => {
  try {

    const alerts = await Alert.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(alerts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// RESOLVE ALERT
// ===============================

export const resolveAlert = async (req, res) => {
  try {

    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    alert.status = "RESOLVED";
    await alert.save();

    // ✅ REALTIME UPDATE
    if (io) {
      io.emit("alertResolved", {
        _id: alert._id,
        status: "RESOLVED"
      });
    }

    res.json({
      message: "Alert resolved",
      alert
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// ===============================
// GET ALL ALERTS (Police)
// ===============================

export const getAllAlerts = async (req,res)=>{
try{

const alerts = await Alert.find()
.populate("userId","name phone email")
.sort({createdAt:-1});

res.json(alerts);

}catch(error){
res.status(500).json({message:error.message});
}
};