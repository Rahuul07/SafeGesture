import Alert from "../models/Alert.js";
import axios from "axios";
import Evidence from "../models/Evidence.js";

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

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    // PREVENT SPAM
    const lastAlert = await Alert.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    if (lastAlert) {
      const diff = Date.now() - new Date(lastAlert.createdAt).getTime();

      if (diff < 10000) {
        return res.status(429).json({
          message: "Please wait before triggering SOS again",
        });
      }
    }

    // ===============================
    // GET ADDRESS
    // ===============================

    let locationName = "";

    try {
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
          },
          headers: {
            "User-Agent": "SafeGestureApp/1.0",
          },
        }
      );

      if (geoRes.data && geoRes.data.display_name) {
        locationName = geoRes.data.display_name;
      }
    } catch (err) {
      console.log("Geo error:", err.message);
    }

    // FINAL FALLBACK
    if (!locationName) {
      locationName = `${latitude}, ${longitude}`;
    }

    // ===============================
    // CREATE ALERT
    // ===============================

    const alert = await Alert.create({
      userId: req.user._id,
      location: { latitude, longitude },
      locationName,
      status: "ACTIVE",
    });

    // SOCKET
    if (io) {
      io.emit("newAlert", alert);
    }

    res.status(201).json({
      message: "SOS Alert Triggered Successfully",
      alert,
    });

  } catch (error) {
    console.error("SOS ERROR:", error);
    res.status(500).json({
      message: "Failed to trigger SOS",
    });
  }
};


// ===============================
// GET ACTIVE ALERTS
// ===============================

export const getActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: "ACTIVE" })
      .populate("userId", "name phone email")
      .lean();

    const alertIds = alerts.map((a) => a._id);

    const evidences = await Evidence.find({
      alertId: { $in: alertIds },
    });

    const alertsWithEvidence = alerts.map((alert) => {
      const evidence = evidences.find(
        (e) => e.alertId.toString() === alert._id.toString()
      );

      return {
        ...alert,
        evidence: evidence
          ? { videoUrl: evidence.videoUrl }
          : null,
      };
    });

    res.json(alertsWithEvidence);

  } catch (error) {
    console.log("Alert fetch error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// USER ALERT HISTORY
// ===============================

export const getUserAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(alerts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
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
        message: "Alert not found",
      });
    }

    alert.status = "RESOLVED";
    await alert.save();

    if (io) {
      io.emit("alertResolved", {
        _id: alert._id,
        status: "RESOLVED",
      });
    }

    res.json({
      message: "Alert resolved",
      alert,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// GET ALL ALERTS (Police)
// ===============================

export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("userId", "name phone email")
      .sort({ createdAt: -1 });

    res.json(alerts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};