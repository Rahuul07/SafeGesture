import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";

import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import evidenceRoutes from "./routes/evidenceRoutes.js";

import { setSocket } from "./controllers/alertController.js";
import { setLocationSocket } from "./controllers/locationController.js";

const app = express();


// ===============================
// PATH FIX
// ===============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// ✅ STATIC FILES (ONLY ONE TIME)
// ===============================

const uploadsPath = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadsPath));

console.log("📁 Serving uploads from:", uploadsPath);


// ===============================
// RATE LIMIT
// ===============================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    message: "Too many requests. Please try again later."
  }
});

app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);


// ===============================
// DATABASE
// ===============================

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected 👽"))
.catch((error) => console.log(error));


// ===============================
// SERVER + SOCKET
// ===============================

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

setSocket(io);
setLocationSocket(io);

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


// ===============================
// ROUTES
// ===============================

app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/evidence", evidenceRoutes);


// ===============================
// ROOT
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