import express from "express";
import protect from "../middleware/auth-middleware.js";
import {
  acceptBooking,
  createBooking,
  getMyBookings,
  getOwnerBookings,
  rejectBooking,
} from "../controllers/booking-controller.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/owner", protect, getOwnerBookings);
router.patch("/:id/accept", protect, acceptBooking);
router.patch("/:id/reject", protect, rejectBooking);

export default router;
