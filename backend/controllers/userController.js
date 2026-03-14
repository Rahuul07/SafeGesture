import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};



// REGISTER USER
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

    await transporter.sendMail(mailOptions);


    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// LOGIN USER
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
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



// GET USER PROFILE
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



// UPDATE USER PROFILE (ONLY NAME AND PHONE)
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

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// ADD EMERGENCY CONTACT
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



// UPDATE LOCATION
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