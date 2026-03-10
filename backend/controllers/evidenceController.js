import Evidence from "../models/Evidence.js";


// UPLOAD VIDEO EVIDENCE
export const uploadEvidence = async(req,res)=>{

    try{

        const {alertId} = req.body;

        const videoPath = req.file.path;

        const evidence = await Evidence.create({
            userId:req.user._id,
            alertId,
            videoUrl:videoPath
        });

        res.json({
            message:"Evidence uploaded successfully",
            evidence
        });

    }catch(error){

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