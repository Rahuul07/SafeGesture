import express from "express";
import multer from "multer";

import {
uploadEvidence,
getAllEvidence
} from "../controllers/evidenceController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({

destination:function(req,file,cb){
cb(null,"uploads/videos");
},

filename:function(req,file,cb){

cb(null,Date.now()+".webm");

}

});

const upload = multer({storage});


// USER SEND VIDEO
router.post("/upload",protect,upload.single("video"),uploadEvidence);


// ADMIN/POLICE VIEW VIDEOS
router.get("/",protect,getAllEvidence);

export default router;