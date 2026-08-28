
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const EquipmentCard = ({ equipment, ownerView = false }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      className="bg-white border h-120 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
    >
      {/* Image */}
      <div className="h-48 bg-green-50 flex items-center justify-center shrink-0">
        <span className="text-6xl">🚜</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {equipment.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {equipment.brand || "No brand"}
              {equipment.model && ` • ${equipment.model}`}
            </p>
          </div>

          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 shrink-0">
            {equipment.status}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-xl font-bold text-green-700">
            ₹{equipment.pricePerDay}
          </span>

          <span className="text-sm text-gray-500">
            {" "} / day
          </span>
        </div>

        {/* Location */}
        <div className="mt-3 text-sm text-gray-500">
          📍 {equipment.location?.district || "Location not provided"}
        </div>

        {/* Owner */}
        {equipment.owner && !ownerView && (
          <div className="mt-3 text-sm text-gray-500">
            Owner: {equipment.owner.name}
          </div>
        )}

        {/* Button */}
        <Link
          to={`/equipment/${equipment._id}`}
          className="block mt-auto pt-2.5 pb-2.5 text-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default EquipmentCard;