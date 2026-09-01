import { useEffect, useState } from "react";
import api from "../../services/api";

const BookingForm = ({ equipment, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Calculate rental duration and total price
  useEffect(() => {
    if (!startDate || !endDate) {
      setTotalDays(0);
      setTotalAmount(0);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setTotalDays(0);
      setTotalAmount(0);
      return;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const days = Math.ceil(
      (end - start) / millisecondsPerDay
    );

    setTotalDays(days);
    setTotalAmount(days * equipment.pricePerDay);
  }, [startDate, endDate, equipment.pricePerDay]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (totalDays <= 0) {
      setError("End date must be after start date");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        equipmentId: equipment._id,
        startDate,
        endDate,
      });

      setSuccess(
        response.data.message || "Rental request sent successfully"
      );

      setStartDate("");
      setEndDate("");
      setTotalDays(0);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to send rental request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Rent This Machinery
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Select your rental dates
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 text-xl"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Rental Summary */}
        {totalDays > 0 && (
          <div className="bg-green-50 rounded-xl p-5 space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Rental duration</span>
              <span className="font-medium">
                {totalDays} {totalDays === 1 ? "day" : "days"}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Price per day</span>
              <span>
                ₹{equipment.pricePerDay}
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">
                Total
              </span>

              <span className="font-bold text-xl text-green-700">
                ₹{totalAmount}
              </span>
            </div>

          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Sending Request..." : "Send Rental Request"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;