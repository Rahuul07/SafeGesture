import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
  uploadEvidence,
  getAllEvidence
} from "../controllers/evidenceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// 🔥 ENSURE FOLDER EXISTS (IMPORTANT)
// ===============================

const uploadPath = "uploads/videos";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Created uploads/videos folder");
}


// ===============================
// MULTER STORAGE
// ===============================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + ".webm");
  }

});


// ===============================
// 🔥 FILE VALIDATION (IMPORTANT)
// ===============================

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {

    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"), false);
    }

  }
});


// ===============================
// ROUTES
// ===============================

// USER SEND VIDEO
router.post(
  "/upload",
  protect,
  upload.single("video"),
  uploadEvidence
);


// ADMIN/POLICE VIEW VIDEOS
router.get("/", protect, getAllEvidence);


export default router;