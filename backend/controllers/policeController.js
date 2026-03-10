import Police from "../models/Police.js";
import Alert from "../models/Alert.js";
import Location from "../models/Location.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};



// POLICE LOGIN
export const loginPolice = async(req,res)=>{

    try{

        const {email,password} = req.body;

        const police = await Police.findOne({email});

        if(police && await bcrypt.compare(password,police.password)){

            res.json({
                message:"Police login successful",
                _id:police._id,
                name:police.name,
                email:police.email,
                station:police.station,
                token:generateToken(police._id)
            });

        }else{

            res.status(401).json({
                message:"Invalid credentials"
            });

        }

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// GET ACTIVE ALERTS
export const getActiveAlerts = async(req,res)=>{

    try{

        const alerts = await Alert.find({status:"ACTIVE"})
        .populate("userId","name phone email");

        res.json(alerts);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// GET LIVE USER LOCATIONS
export const getLiveLocations = async(req,res)=>{

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



// RESOLVE ALERT
export const resolveAlert = async(req,res)=>{

    try{

        const alert = await Alert.findById(req.params.id);

        if(!alert){
            return res.status(404).json({
                message:"Alert not found"
            });
        }

        alert.status = "RESOLVED";

        await alert.save();

        res.json({
            message:"Alert resolved successfully",
            alert
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// ALERT HISTORY
export const alertHistory = async(req,res)=>{

    try{

        const alerts = await Alert.find()
        .populate("userId","name phone email");

        res.json(alerts);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};