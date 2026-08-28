// This handles the GET /api/equipment

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import EquipmentCard from "../../components/EquipmentCard";
import { gsap } from "gsap";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headerRef = useRef();
  const cardsRef = useRef();

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/equipment");

      setEquipment(response.data.equipment || []);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to load machinery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Agricultural Machinery
            </h1>

            <p className="text-gray-500 mt-1">
              Find machinery available for rent near you.
            </p>
          </div>

          <Link
            to="/add-equipment"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-center"
          >
            + List Your Machinery
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading machinery...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>

            <button
              onClick={fetchEquipment}
              className="px-5 py-2 bg-green-600 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && equipment.length === 0 && (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <div className="text-6xl mb-4">🚜</div>

            <h2 className="text-xl font-semibold">No machinery listed yet</h2>

            <p className="text-gray-500 mt-2">
              Be the first person to list agricultural machinery.
            </p>

            <Link
              to="/add-equipment"
              className="inline-block mt-5 bg-green-600 text-white px-5 py-2.5 rounded-lg"
            >
              Add Machinery
            </Link>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && equipment.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <EquipmentCard key={item._id} equipment={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentList;
