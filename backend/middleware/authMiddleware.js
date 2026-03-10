import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Police from "../models/Police.js";

export const protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user
      let account = await User.findById(decoded.id).select("-password");

      // If not user, try admin
      if (!account) {
        account = await Admin.findById(decoded.id).select("-password");
      }

      // If not admin, try police
      if (!account) {
        account = await Police.findById(decoded.id).select("-password");
      }

      if (!account) {
        return res.status(401).json({
          message: "Account not found"
        });
      }

      req.user = account;

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

  } else {

    return res.status(401).json({
      message: "No token"
    });

  }

};



// ADMIN ONLY ACCESS
export const adminOnly = (req,res,next)=>{

  if(req.user && req.user.role === "admin"){
    next();
  }else{
    res.status(403).json({
      message:"Admin access required"
    });
  }

};



// POLICE ONLY ACCESS
export const policeOnly = (req,res,next)=>{

  if(req.user && req.user.role === "police"){
    next();
  }else{
    res.status(403).json({
      message:"Police access required"
    });
  }

};