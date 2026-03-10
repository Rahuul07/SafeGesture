import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Police from "../models/Police.js";
import Alert from "../models/Alert.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};


// REGISTER ADMIN
export const registerAdmin = async (req,res)=>{

    try{

        const {name,email,password} = req.body;

        const adminExists = await Admin.findOne({email});

        if(adminExists){
            return res.status(400).json({
                message:"Admin already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const admin = await Admin.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message:"Admin registered successfully",
            admin:{
                _id:admin._id,
                name:admin.name,
                email:admin.email
            }
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// ADMIN LOGIN
export const loginAdmin = async(req,res)=>{

    try{

        const {email,password} = req.body;

        const admin = await Admin.findOne({email});

        if(admin && await bcrypt.compare(password,admin.password)){

            res.json({
                message:"Admin login successful",
                _id:admin._id,
                name:admin.name,
                email:admin.email,
                token:generateToken(admin._id)
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



// CREATE POLICE ACCOUNT
export const createPolice = async(req,res)=>{

    try{

        const {name,email,password,station,phone} = req.body;

        const policeExists = await Police.findOne({email});

        if(policeExists){
            return res.status(400).json({
                message:"Police already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const police = await Police.create({
            name,
            email,
            password:hashedPassword,
            station,
            phone
        });

        res.status(201).json({
            message:"Police account created successfully",
            police
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// GET ALL USERS
export const getAllUsers = async(req,res)=>{

    try{

        const users = await User.find().select("-password");

        res.json(users);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// DELETE USER
export const deleteUser = async(req,res)=>{

    try{

        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        await user.deleteOne();

        res.json({
            message:"User deleted successfully"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// VIEW ALL ALERTS
export const getAllAlerts = async(req,res)=>{

    try{

        const alerts = await Alert.find()
        .populate("userId","name email phone");

        res.json(alerts);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};