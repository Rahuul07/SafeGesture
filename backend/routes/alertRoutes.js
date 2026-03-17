import express from "express";

import {
  createAlert,
  getActiveAlerts,
  getUserAlerts,
  resolveAlert
} from "../controllers/alertController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// 🚨 SOS ROUTE (HIGH PRIORITY)
// ===============================

// NEVER rate limit this route
router.post("/sos", protect, createAlert);


// ===============================
// USER ALERT HISTORY
// ===============================

router.get("/my-alerts", protect, getUserAlerts);


// ===============================
// POLICE FETCH ACTIVE ALERTS
// ===============================

router.get("/active", protect, getActiveAlerts);


// ===============================
// POLICE RESOLVE ALERT
// ===============================

router.put("/resolve/:id", protect, resolveAlert);


export default router;