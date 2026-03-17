import Evidence from "../models/Evidence.js";


// UPLOAD VIDEO EVIDENCE
export const uploadEvidence = async(req,res)=>{

    try{

        const {alertId} = req.body;

        // CHECK VIDEO FILE
        if(!req.file){
            return res.status(400).json({
                message:"Video file missing"
            });
        }

        // CHECK ALERT ID
        if(!alertId){
            return res.status(400).json({
                message:"Alert ID is required"
            });
        }

        // FRONTEND ACCESSIBLE VIDEO URL
        const videoUrl = `/uploads/videos/${req.file.filename}`;

        const evidence = await Evidence.create({
            userId:req.user._id,
            alertId,
            videoUrl
        });

        res.json({
            message:"Evidence uploaded successfully",
            evidence
        });

    }catch(error){

        console.error("Evidence Upload Error:",error);

        res.status(500).json({
            message:error.message
        });

    }

};




// GET ALL EVIDENCE
export const getAllEvidence = async(req,res)=>{

    try{

        const evidence = await Evidence.find()
        .populate("userId","name phone")
        .populate("alertId");

        res.json(evidence);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};