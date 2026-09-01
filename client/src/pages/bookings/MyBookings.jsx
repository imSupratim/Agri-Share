import { useEffect, useState } from "react";
import BookingCard from "../../components/Booking/BookingCard";
import { getMyBookings } from "../../services/bookingService";
import Heading from "../../components/Heading/Heading";
import Loading from "../../components/Loading/Loading";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyBookings();

        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message || "Failed to load your bookings",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Loading pageName="your rentals"/>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-linear-to-b from-green-50  to-yellow-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Heading highlight="My" heading="Rentals" />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && bookings.length === 0 && (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🚜</div>

            <h2 className="text-xl font-semibold text-gray-900">
              No rental requests yet
            </h2>

            <p className="text-gray-500 mt-2">
              Browse the marketplace and rent machinery that you need.
            </p>
          </div>
        )}

        {/* Bookings */}
        {bookings.length > 0 && (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
