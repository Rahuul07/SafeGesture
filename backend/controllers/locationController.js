import Location from "../models/Location.js";
import Alert from "../models/Alert.js"; // ✅ ADDED

let io;

export const setLocationSocket = (socketIo)=>{
    io = socketIo;
};


// UPDATE LIVE LOCATION
export const updateLocation = async (req,res)=>{

    try{

        const {latitude,longitude} = req.body;

        const location = await Location.create({
            userId:req.user._id,
            latitude,
            longitude
        });

        // ✅ UPDATE ACTIVE ALERT WITH LATEST LOCATION
        const activeAlert = await Alert.findOne({
            userId: req.user._id,
            status: "ACTIVE"
        });

        if(activeAlert){
            activeAlert.location = {
                latitude,
                longitude
            };

            await activeAlert.save();
        }

        // REALTIME LOCATION EVENT
        if(io){
            io.emit("userLocationUpdate",{
                userId:req.user._id,
                latitude,
                longitude
            });
        }

        res.json({
            message:"Location updated",
            location
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// GET USER LOCATION HISTORY
export const getUserLocations = async (req,res)=>{

    try{

        const locations = await Location.find({
            userId:req.user._id
        });

        res.json(locations);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// POLICE FETCH ALL ACTIVE USER LOCATIONS
export const getAllLocations = async (req,res)=>{

    try{

        const locations = await Location.find()
        .populate("userId","name phone");

        res.json(locations);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};