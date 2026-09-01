const OwnerBookingCard = ({
  booking,
  onAccept,
  onReject,
  actionLoading,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = () => {
    switch (booking.status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border mb-5 rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">

        <div>
          <p className="text-sm text-green-600 font-medium">
            {booking.equipment?.category}
          </p>

          <h2 className="text-xl font-bold text-gray-900">
            {booking.equipment?.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {booking.equipment?.brand || "Brand not provided"}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle()}`}
        >
          {booking.status}
        </span>

      </div>

      {/* Renter */}
      {booking.renter && (
        <div className="mt-5 bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Rental Requested By
          </p>

          <div className="mt-2">

            <p className="font-semibold text-gray-900">
              {booking.renter.name}
            </p>

            <p className="text-sm text-gray-500">
              {booking.renter.email}
            </p>

            {booking.renter.phone && (
              <p className="text-sm text-gray-500 mt-1">
                {booking.renter.phone}
              </p>
            )}

          </div>

        </div>
      )}

      {/* Rental Dates */}
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

          <span className="font-semibold">
            Total Amount
          </span>

          <span className="text-xl font-bold text-green-700">
            ₹{booking.totalAmount}
          </span>

        </div>

      </div>

      {/* Actions */}
      {booking.status === "pending" && (
        <div className="mt-5 pt-5 border-t flex gap-3">

          <button
            type="button"
            onClick={() => onReject(booking._id)}
            disabled={actionLoading}
            className="flex-1 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => onAccept(booking._id)}
            disabled={actionLoading}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            Accept
          </button>

        </div>
      )}

    </div>
  );
};

export default OwnerBookingCard;