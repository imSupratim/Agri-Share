// GET /api/equipment/mine

import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import gsap from "gsap";

const MyEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headerRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(listRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const fetchMyEquipment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/equipment/mine");

      setEquipment(response.data.equipment || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to load your machinery",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEquipment();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this machinery?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/equipment/${id}`);

      setEquipment((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete machinery");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Machinery</h1>

            <p className="text-gray-500 mt-1">
              Manage the agricultural machinery you have listed.
            </p>
          </div>

          <Link
            to="/add-equipment"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-center"
          >
            + Add Machinery
          </Link>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading your machinery...
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>

            <button
              onClick={fetchMyEquipment}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && equipment.length === 0 && (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <div className="text-6xl mb-4">🚜</div>

            <h2 className="text-xl font-semibold text-gray-900">
              You haven't listed any machinery
            </h2>

            <p className="text-gray-500 mt-2">
              Start earning by renting out your agricultural machinery.
            </p>

            <Link
              to="/add-equipment"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              List Machinery
            </Link>
          </div>
        )}

        {!loading && !error && equipment.length > 0 && (
          <div className="space-y-4">
            {equipment.map((item) => (
              <div
            
                key={item._id}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >
                <div  className="flex flex-col md:flex-row md:items-center gap-5">
                  {/* Icon */}
                  <div className="w-24 h-24 rounded-xl bg-green-50 flex items-center justify-center text-4xl shrink-0">
                    🚜
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold">{item.name}</h2>

                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {item.status}
                      </span>
                    </div>

                    <p className="text-gray-500 mt-1">
                      {item.brand || "No brand"}
                      {item.model && ` • ${item.model}`}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-5 text-sm">
                      <span>
                        <strong className="text-gray-900">
                          ₹{item.pricePerDay}
                        </strong>{" "}
                        / day
                      </span>

                      <span className="text-gray-500">
                        📍 {item.location?.district || "No location"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/equipment/${item._id}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      View
                    </Link>

                    <Link
                      to={`/equipment/${item._id}/edit`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEquipment;
