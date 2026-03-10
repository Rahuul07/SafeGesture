import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/userRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import evidenceRoutes from "./routes/evidenceRoutes.js";

import { setSocket } from "./controllers/alertController.js";
import { setLocationSocket } from "./controllers/locationController.js";

dotenv.config();

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// RATE LIMITING (Security)
// ===============================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    message: "Too many requests, please try again later."
  }
});

app.use(limiter);


// ===============================
// STATIC VIDEO ACCESS
// ===============================

app.use("/uploads", express.static("uploads"));


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Atlas Connected 👽");
})
.catch((error) => {
  console.log(error);
});


// ===============================
// CREATE HTTP SERVER
// ===============================

const server = http.createServer(app);


// ===============================
// SOCKET.IO SERVER
// ===============================

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


// PASS SOCKET TO CONTROLLERS

setSocket(io);
setLocationSocket(io);


// SOCKET CONNECTION

io.on("connection", (socket) => {

  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});


// ===============================
// API ROUTES
// ===============================

app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/evidence", evidenceRoutes);


// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("SafeGesture Backend Running 🚀");
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});