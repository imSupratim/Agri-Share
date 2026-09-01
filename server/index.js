import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth-routes.js";
import profileRoutes from "./routes/profile-routes.js";
import equipmentRoutes from "./routes/equipment-routes.js";
import bookingRoutes from "./routes/booking-routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => res.json({ message: "Agri Share API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings", bookingRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Appplication running on port: ${port}`);
});
