import express from "express";

import {
loginPolice,
getActiveAlerts,
getLiveLocations,
resolveAlert,
alertHistory
} from "../controllers/policeController.js";

import { protect, policeOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// POLICE LOGIN
router.post("/login", loginPolice);


// VIEW ACTIVE ALERTS
router.get("/alerts", protect, policeOnly, getActiveAlerts);


// VIEW LIVE LOCATIONS
router.get("/locations", protect, policeOnly, getLiveLocations);


// RESOLVE ALERT
router.put("/resolve-alert/:id", protect, policeOnly, resolveAlert);


// ALERT HISTORY
router.get("/alert-history", protect, policeOnly, alertHistory);


export default router;