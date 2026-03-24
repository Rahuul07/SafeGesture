import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 PROTECT ROUTE
export const protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      req.user = user;

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

// 🛡️ ADMIN ONLY
export const adminOnly = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin access required"
    });
  }

};

// 🚓 POLICE ONLY
export const policeOnly = (req, res, next) => {

  if (req.user && req.user.role === "police") {
    next();
  } else {
    res.status(403).json({
      message: "Police access required"
    });
  }

};