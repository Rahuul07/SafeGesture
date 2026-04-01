import express from "express";
import multer from "multer";
import path from "path";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addEmergencyContact,
  updateLocation
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/userController.js";

const router = express.Router();


// ===============================
// MULTER CONFIG (PROFILE IMAGE)
// ===============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// ===============================
// ROUTES
// ===============================

// USER REGISTER
router.post("/register", registerUser);

// USER LOGIN
router.post("/login", loginUser);

// GET PROFILE
router.get("/profile", protect, getUserProfile);

// ✅ UPDATED PROFILE (WITH IMAGE UPLOAD)
router.put("/update-profile", protect, upload.single("image"), updateUserProfile);

// ADD EMERGENCY CONTACT
router.post("/add-contact", protect, addEmergencyContact);

// UPDATE LOCATION
router.put("/location", protect, updateLocation);

// CHANGE PASSWORD
router.put("/change-password", protect, changePassword);


export default router;