import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Email server error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


// ===============================
// REGISTER USER
// ===============================

export const registerUser = async (req, res) => {

  try {

    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

   // SEND WELCOME EMAIL
    const mailOptions = {
      from: `"SafeGesture AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to SafeGesture AI 🛡️",
      html: `
      <div style="font-family:Arial;padding:20px">
      
      <h2>Welcome ${name} 👋</h2>
      
      <p>
      Your account has been successfully created in 
      <b>SafeGesture AI Women Safety System</b>.
      </p>

      <p>
      SafeGesture helps protect users using gesture-based SOS alerts
      and intelligent safety monitoring.
      </p>

      <h3>Platform Features</h3>

      <ul>
      <li>🛡️ Gesture-based SOS trigger</li>
      <li>📍 Live location tracking</li>
      <li>📹 Automatic evidence recording</li>
      <li>🚓 Instant police alerts</li>
      </ul>

      <p>
      You can now login and start using the platform.
      </p>

      <br/>

      <p>
      Stay safe,<br/>
      <b>SafeGesture AI Team</b>
      </p>

      </div>
      `
    };

  

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);


    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// LOGIN USER
// ===============================

export const loginUser = async (req, res) => {

  try {

    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(401).json({
        message: `No ${role} account found with this email`
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {

      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });

    } else {

      res.status(401).json({
        message: "Invalid credentials"
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// GET USER PROFILE
// ===============================

export const getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "User not found"
      });
    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// UPDATE USER PROFILE (FINAL FIX)
// ===============================

export const updateUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const { name, phone } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;

    // ===============================
    // 🔥 IMAGE UPDATE + DELETE OLD
    // ===============================

    if (req.file) {

      const fs = await import("fs");

      // DELETE OLD IMAGE
      if (user.image) {

        const oldPath = `.${user.image}`; // ./uploads/profile/file.jpg

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("🗑 Old image deleted:", oldPath);
        }

      }

      // SAVE NEW IMAGE
      user.image = `/uploads/profile/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image
      }
    });

  } catch (error) {

    console.error("Update Profile Error:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// ADD EMERGENCY CONTACT
// ===============================

export const addEmergencyContact = async (req, res) => {

  try {

    const { name, phone } = req.body;

    const user = await User.findById(req.user._id);

    user.emergencyContacts.push({
      name,
      phone
    });

    await user.save();

    res.json({
      message: "Emergency contact added",
      contacts: user.emergencyContacts
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// UPDATE LOCATION
// ===============================

export const updateLocation = async (req, res) => {

  try {

    const { latitude, longitude } = req.body;

    const user = await User.findById(req.user._id);

    user.location = {
      latitude,
      longitude
    };

    await user.save();

    res.json({
      message: "Location updated",
      location: user.location
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ===============================
// CHANGE PASSWORD
// ===============================

export const changePassword = async (req, res) => {

  try {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // CHECK OLD PASSWORD
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    // HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password changed successfully 🔐"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ===============================
// FORGOT PASSWORD - SEND OTP
// ===============================

export const sendResetOtp = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 🔥 GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    // 📧 SEND EMAIL
    await transporter.sendMail({
      from: `"SafeGesture AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP 🔐",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes</p>
      `
    });

    res.json({
      message: "OTP sent to email"
    });

  } catch (error) {

    console.error("OTP Error:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


// ===============================
// RESET PASSWORD WITH OTP
// ===============================

export const resetPassword = async (req, res) => {

  try {

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    // 🔐 HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // CLEAR OTP
    user.resetOtp = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      message: "Password reset successful ✅"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};