import express from "express";

import {
registerAdmin,
loginAdmin,
createPolice,
getAllUsers,
deleteUser,
getAllAlerts
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


// ADMIN REGISTRATION
router.post("/register", registerAdmin);


// ADMIN LOGIN
router.post("/login", loginAdmin);


// CREATE POLICE ACCOUNT
router.post("/create-police", protect, adminOnly, createPolice);


// VIEW ALL USERS
router.get("/users", protect, adminOnly, getAllUsers);


// DELETE USER
router.delete("/users/:id", protect, adminOnly, deleteUser);


// VIEW ALL ALERTS
router.get("/alerts", protect, adminOnly, getAllAlerts);


export default router;