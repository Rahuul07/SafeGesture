import Location from "../models/Location.js";

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

        // REALTIME LOCATION EVENT
        if(io){
            io.emit("userLocationUpdate",location);
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