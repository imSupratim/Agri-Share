import Booking from "../models/Booking.js";
import Equipment from "../models/Equipment.js";

export const createBooking = async (req, res) => {
  try {
    const { equipmentId, startDate, endDate } = req.body;

    // 1. Validate required fields
    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Equipment, start date and end date are required",
      });
    }

    // 2. Find equipment
    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    // 3. User cannot rent their own equipment
    if (equipment.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot rent your own equipment",
      });
    }

    // 4. Check equipment status
    if (equipment.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Equipment is currently unavailable",
      });
    }

    // 5. Convert dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 6. Validate date format
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    // 7. End date must be after start date
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // 8. Check if dates are in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be in the past",
      });
    }

    // 9. Check for an existing accepted booking
    const conflictingBooking = await Booking.findOne({
      equipment: equipment._id,
      status: "accepted",

      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: "Equipment is already booked for these dates",
      });
    }

    // 10. Check for duplicate pending request
    const existingRequest = await Booking.findOne({
      equipment: equipment._id,
      renter: req.user._id,
      status: "pending",

      startDate: start,
      endDate: end,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending request for these dates",
      });
    }

    // 11. Calculate rental duration
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.ceil((end - start) / millisecondsPerDay);

    // 12. Calculate total amount
    const pricePerDay = equipment.pricePerDay;

    const totalAmount = totalDays * pricePerDay;

    // 13. Create booking
    const booking = await Booking.create({
      equipment: equipment._id,
      renter: req.user._id,
      owner: equipment.owner,

      startDate: start,
      endDate: end,

      totalDays,
      pricePerDay,
      totalAmount,

      status: "pending",
    });

    // 14. Send response
    return res.status(201).json({
      success: true,
      message: "Rental request sent successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      renter: req.user._id,
    })
      .populate("equipment")
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get my bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      owner: req.user._id,
    })
      .populate("equipment")
      .populate("renter", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get owner bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const acceptBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the booking
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 2. Check if the logged-in user is the owner
    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this booking",
      });
    }

    // 3. Only pending bookings can be accepted
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be accepted",
      });
    }

    // 4. Check for overlapping accepted bookings
    const conflictingBooking = await Booking.findOne({
      equipment: booking.equipment,
      status: "accepted",

      startDate: { $lt: booking.endDate },
      endDate: { $gt: booking.startDate },
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: "Equipment is already booked for these dates",
      });
    }

    // 5. Accept the booking
    booking.status = "accepted";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      booking,
    });
  } catch (error) {
    console.error("Accept booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the booking
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 2. Check if the logged-in user is the owner
    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject this booking",
      });
    }

    // 3. Only pending bookings can be rejected
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be rejected",
      });
    }

    // 4. Reject the booking
    booking.status = "rejected";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    console.error("Reject booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
