import { useEffect, useState } from "react";
import api from "../services/api";
import { Tractor } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      village: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/profile");

      const user = response.data.user;

      setProfile(user);

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          village: user.address?.village || "",
          district: user.address?.district || "",
          state: user.address?.state || "",
          pincode: user.address?.pincode || "",
        },
      });
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.patch("/profile", formData);

      const updatedUser = response.data.user;

      setProfile(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        phone: updatedUser.phone || "",
        address: {
          street: updatedUser.address?.street || "",
          village: updatedUser.address?.village || "",
          district: updatedUser.address?.district || "",
          state: updatedUser.address?.state || "",
          pincode: updatedUser.address?.pincode || "",
        },
      });

      setIsEditing(false);
      setSuccess("Profile updated successfully");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      address: {
        street: profile.address?.street || "",
        village: profile.address?.village || "",
        district: profile.address?.district || "",
        state: profile.address?.state || "",
        pincode: profile.address?.pincode || "",
      },
    });

    setIsEditing(false);
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>

          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-green-50  to-yellow-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex gap-3 items-center text-gray-900">
            <Tractor className="size-10 bg-green-500 rounded-full p-2" /> My
            Profile
          </h1>

          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-green-700 px-6 py-8">
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-green-700">
                  {profile?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="text-white">
                  <h2 className="text-2xl font-semibold">{profile?.name}</h2>

                  <p className="text-green-100">{profile?.email}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h3>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.name || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-500">
                    {profile?.email}
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Email cannot be changed here
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Address
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Street */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street / Address
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      placeholder="Enter street or address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.address?.street || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Village */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="village"
                      value={formData.address.village}
                      onChange={handleAddressChange}
                      placeholder="Enter village"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.address?.village || "Not provided"}
                    </p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="district"
                      value={formData.address.district}
                      onChange={handleAddressChange}
                      placeholder="Enter district"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.address?.district || "Not provided"}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.address.state}
                      onChange={handleAddressChange}
                      placeholder="Enter state"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.address?.state || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="pincode"
                      value={formData.address.pincode}
                      onChange={handleAddressChange}
                      placeholder="Enter pincode"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile?.address?.pincode || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="border-t border-gray-200 px-6 md:px-8 py-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
