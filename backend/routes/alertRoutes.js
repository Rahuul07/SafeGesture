import express from "express";

import {
  createAlert,
  getActiveAlerts,
  getAllAlerts,
  getUserAlerts,
  resolveAlert
} from "../controllers/alertController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// 🚨 SOS ROUTE (CRITICAL - NO LIMIT)
// ===============================
router.post("/sos", protect, createAlert);


// ===============================
// 👤 USER ALERT HISTORY
// ===============================
router.get("/my-alerts", protect, getUserAlerts);


// ===============================
// 👮 POLICE - ACTIVE ALERTS
// ===============================
router.get("/active", protect, getActiveAlerts);


// ===============================
// 👮 POLICE - ALL ALERTS
// ===============================
router.get("/all", protect, getAllAlerts);


// ===============================
// 👮 POLICE - RESOLVE ALERT
// ===============================
router.put("/resolve/:id", protect, resolveAlert);


export default router;