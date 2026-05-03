import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import cryptoRoutes from "./routes/crypto.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ── Routes ──
app.use("/auth", authRoutes);
app.use("/crypto", cryptoRoutes);
app.use("/user", userRoutes);

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ message: "Coinbase Clone API is running 🚀" });
});

// ── Connect DB & Start ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
