import Alert from "../models/Alert.js";

let io;

// SET SOCKET INSTANCE FROM SERVER
export const setSocket = (socketIo) => {
  io = socketIo;
};


// CREATE SOS ALERT
export const createAlert = async (req, res) => {
  try {

    const { latitude, longitude } = req.body;

    const alert = await Alert.create({
      userId: req.user._id,
      location: {
        latitude,
        longitude
      }
    });

    // EMIT REALTIME EVENT
    if (io) {
      io.emit("newAlert", alert);
    }

    res.status(201).json({
      message: "SOS Alert Triggered",
      alert
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ACTIVE ALERTS (POLICE)
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


// USER ALERT HISTORY
export const getUserAlerts = async (req, res) => {
  try {

    const alerts = await Alert.find({
      userId: req.user._id
    });

    res.json(alerts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// RESOLVE ALERT
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

    // NOTIFY CLIENTS
    if (io) {
      io.emit("alertResolved", alert);
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