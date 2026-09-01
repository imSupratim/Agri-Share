import { useEffect, useState } from "react";

import OwnerBookingCard from "../../components/Booking/OwnerBookingCard";

import {
  getOwnerBookings,
  acceptBooking,
  rejectBooking,
} from "../../services/bookingService";
import Loading from "../../components/Loading/Loading";
import Heading from "../../components/Heading/Heading";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stores which booking is currently being processed
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getOwnerBookings();

        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load rental requests",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Accept booking
  const handleAccept = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to accept this rental request?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setActionLoading(bookingId);

      const data = await acceptBooking(bookingId);

      // Update only the booking that was accepted
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking,
        ),
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to accept booking",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Reject booking
  const handleReject = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this rental request?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setActionLoading(bookingId);

      const data = await rejectBooking(bookingId);

      // Update only the booking that was rejected
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking,
        ),
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to reject booking",
      );
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Loading pageName="new requests" />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50  to-yellow-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Heading highlight="New" heading="Requests" />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <p className="text-gray-500">
              No rental requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <OwnerBookingCard
                key={booking._id}
                booking={booking}
                onAccept={() => handleAccept(booking._id)}
                onReject={() => handleReject(booking._id)}
                actionLoading={
                  actionLoading === booking._id
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;