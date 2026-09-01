import api from "./api";

export const getMyBookings = async () => {
  const response = await api.get("/bookings/my");

  return response.data;
};

export const getOwnerBookings = async () => {
  const response = await api.get("/bookings/owner");

  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/accept`
  );

  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const response = await api.patch(
    `/bookings/${bookingId}/reject`
  );

  return response.data;
};