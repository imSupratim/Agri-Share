// GET /api/equipment/:id

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipment/${id}`);

        setEquipment(response.data.equipment);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load machinery"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading machinery...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!equipment) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-900 mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl border overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Image */}
            <div className="min-h-[400px] bg-green-50 flex items-center justify-center">
              <span className="text-9xl">
                🚜
              </span>
            </div>

            {/* Information */}
            <div className="p-8">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-sm text-green-600 font-medium">
                    {equipment.category}
                  </p>

                  <h1 className="text-3xl font-bold text-gray-900 mt-1">
                    {equipment.name}
                  </h1>

                  <p className="text-gray-500 mt-2">
                    {equipment.brand || "Brand not provided"}
                    {equipment.model &&
                      ` • ${equipment.model}`}
                  </p>
                </div>

                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {equipment.status}
                </span>

              </div>

              {/* Price */}
              <div className="mt-8 p-5 bg-green-50 rounded-xl">

                <p className="text-sm text-gray-500">
                  Rental Price
                </p>

                <div className="mt-1">
                  <span className="text-3xl font-bold text-green-700">
                    ₹{equipment.pricePerDay}
                  </span>

                  <span className="text-gray-500">
                    {" "} / day
                  </span>
                </div>

                {equipment.securityDeposit > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Security deposit: ₹
                    {equipment.securityDeposit}
                  </p>
                )}

              </div>

              {/* Description */}
              <div className="mt-8">

                <h2 className="font-semibold text-lg">
                  Description
                </h2>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  {equipment.description ||
                    "No description provided."}
                </p>

              </div>

              {/* Location */}
              <div className="mt-8">

                <h2 className="font-semibold text-lg">
                  Location
                </h2>

                <div className="mt-2 text-gray-600 space-y-1">

                  {equipment.location?.address && (
                    <p>
                      {equipment.location.address}
                    </p>
                  )}

                  <p>
                    {equipment.location?.village}
                    {equipment.location?.district &&
                      `, ${equipment.location.district}`}
                  </p>

                  <p>
                    {equipment.location?.state}
                  </p>

                </div>

              </div>

              {/* Owner */}
              {equipment.owner && (
                <div className="mt-8 pt-6 border-t">

                  <h2 className="font-semibold text-lg">
                    Machinery Owner
                  </h2>

                  <div className="flex items-center gap-4 mt-4">

                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                      {equipment.owner.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium">
                        {equipment.owner.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {equipment.owner.email}
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* Future rental button */}
              <button
                disabled
                className="w-full mt-8 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
              >
                Rental Booking — Coming Soon
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EquipmentDetails;