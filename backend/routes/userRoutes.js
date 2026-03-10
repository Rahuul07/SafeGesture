import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addEmergencyContact,
  updateLocation
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// USER REGISTER
router.post("/register", registerUser);


// USER LOGIN
router.post("/login", loginUser);


// GET PROFILE
router.get("/profile", protect, getUserProfile);


// UPDATE PROFILE
router.put("/update-profile", protect, updateUserProfile);


// ADD EMERGENCY CONTACT
router.post("/add-contact", protect, addEmergencyContact);


// UPDATE LOCATION
router.put("/location", protect, updateLocation);


export default router;