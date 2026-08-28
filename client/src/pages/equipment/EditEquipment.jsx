// GET /api/equipment/:id
// PATCH /api/equipment/:id

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    description: "",
    pricePerDay: "",
    securityDeposit: "",
    status: "available",
    location: {
      address: "",
      village: "",
      district: "",
      state: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get(`/equipment/${id}`);

        const item = response.data.equipment;

        setFormData({
          name: item.name || "",
          category: item.category || "",
          brand: item.brand || "",
          model: item.model || "",
          description: item.description || "",
          pricePerDay: item.pricePerDay || "",
          securityDeposit: item.securityDeposit || "",
          status: item.status || "available",

          location: {
            address: item.location?.address || "",
            village: item.location?.village || "",
            district: item.location?.district || "",
            state: item.location?.state || "",
            mapurl: item.location?.mapurl || "",
          },
        });
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load machinery");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.patch(`/equipment/${id}`, {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        securityDeposit: Number(formData.securityDeposit) || 0,
      });

      navigate("/my-equipment");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update machinery");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Machinery</h1>

          <p className="text-gray-500 mt-1">Update your machinery listing.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border rounded-2xl">
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Machinery Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select category</option>
                  <option value="Tractor">Tractor</option>
                  <option value="Harvester">Harvester</option>
                  <option value="Rotavator">Rotavator</option>
                  <option value="Cultivator">Cultivator</option>
                  <option value="Seeder">Seeder</option>
                  <option value="Thresher">Thresher</option>
                  <option value="Sprayer">Sprayer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Model</label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price / Day
                </label>

                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Security Deposit
                </label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="available">Available</option>

                  <option value="unavailable">Unavailable</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6">Location</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.location.address}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Village
                </label>

                <input
                  type="text"
                  name="village"
                  value={formData.location.village}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={formData.location.district}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Map Location</label>

                <input
                  type="text"
                  name="mapurl"
                  value={formData.location.mapurl}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t p-6 md:p-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/my-equipment")}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-7 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipment;
