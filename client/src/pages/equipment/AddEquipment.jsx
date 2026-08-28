// POST /api/equipment

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddEquipment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    description: "",
    pricePerDay: "",
    securityDeposit: "",
    location: {
      address: "",
      village: "",
      district: "",
      state: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setLoading(true);
      setError("");

      const response = await api.post("/equipment", {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        securityDeposit:
          Number(formData.securityDeposit) || 0,
      });

      if (response.data.success) {
        navigate("/my-equipment");
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to add machinery"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            List Your Machinery
          </h1>

          <p className="text-gray-500 mt-1">
            Rent out your agricultural machinery to nearby farmers.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm"
        >

          {/* Basic Information */}
          <div className="p-6 md:p-8">

            <h2 className="text-xl font-semibold mb-6">
              Machinery Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Machinery Name <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Mahindra 575 DI Tractor"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-600">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Tractor">
                    Tractor
                  </option>

                  <option value="Harvester">
                    Harvester
                  </option>

                  <option value="Rotavator">
                    Rotavator
                  </option>

                  <option value="Cultivator">
                    Cultivator
                  </option>

                  <option value="Seeder">
                    Seeder
                  </option>

                  <option value="Thresher">
                    Thresher
                  </option>

                  <option value="Sprayer">
                    Sprayer
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Mahindra"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. 575 DI"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rental Price / Day <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    placeholder="1500"
                    min="0"
                    required
                    className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* Deposit */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Security Deposit
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the condition, features and usage of your machinery..."
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                />
              </div>

            </div>
          </div>

          {/* Location */}
          <div className="border-t p-6 md:p-8">

            <h2 className="text-xl font-semibold mb-6">
              Machinery Location
            </h2>

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
                  placeholder="Street / local address"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
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
                  placeholder="Village"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
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
                  placeholder="District"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  placeholder="State"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="border-t p-6 md:p-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            >
              {loading
                ? "Adding..."
                : "List Machinery"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEquipment;