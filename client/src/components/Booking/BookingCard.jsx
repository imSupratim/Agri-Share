const BookingCard = ({ booking }) => {
  const getStatusStyle = () => {
    switch (booking.status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">

      {/* Equipment */}
      <div className="flex justify-between items-start gap-4">

        <div>
          <p className="text-sm text-green-600 font-medium">
            {booking.equipment?.category}
          </p>

          <h2 className="text-xl font-bold text-gray-900">
            {booking.equipment?.name}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {booking.equipment?.brand || "Brand not provided"}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle()}`}
        >
          {booking.status}
        </span>

      </div>

      {/* Dates */}
      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">
            Start Date
          </p>

          <p className="font-medium mt-1">
            {formatDate(booking.startDate)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">
            End Date
          </p>

          <p className="font-medium mt-1">
            {formatDate(booking.endDate)}
          </p>
        </div>

      </div>

      {/* Price */}
      <div className="mt-5 border-t pt-4">

        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {booking.totalDays}{" "}
            {booking.totalDays === 1 ? "day" : "days"}
          </span>

          <span>
            ₹{booking.pricePerDay} / day
          </span>
        </div>

        <div className="flex justify-between mt-2">

          <span className="font-semibold text-gray-900">
            Total
          </span>

          <span className="text-xl font-bold text-green-700">
            ₹{booking.totalAmount}
          </span>

        </div>

      </div>

      {/* Owner */}
      {booking.owner && (
        <div className="mt-4 pt-4 border-t">

          <p className="text-sm text-gray-500">
            Machinery Owner
          </p>

          <p className="font-medium mt-1">
            {booking.owner.name}
          </p>

        </div>
      )}

    </div>
  );
};

export default BookingCard;