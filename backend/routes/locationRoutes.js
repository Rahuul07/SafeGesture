import express from "express";

import {
updateLocation,
getUserLocations,
getAllLocations
} from "../controllers/locationController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();


// USER SENDS LOCATION
router.post("/update",protect,updateLocation);


// USER LOCATION HISTORY
router.get("/my-locations",protect,getUserLocations);


// POLICE / ADMIN FETCH ALL LOCATIONS
router.get("/all",protect,getAllLocations);

export default router;