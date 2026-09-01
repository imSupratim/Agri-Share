import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import EquipmentList from "./pages/equipment/EquipmentList";
import AddEquipment from "./pages/equipment/AddEquipment";
import MyEquipment from "./pages/equipment/MyEquipment";
import EquipmentDetails from "./pages/equipment/EquipmentDetails";
import EditEquipment from "./pages/equipment/EditEquipment";
import MyBookings from "./pages/bookings/MyBookings";
import MapTest from "./pages/MapTest";
import OwnerBookings from "./pages/bookings/OwnerBookings";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/my-equipment" element={<MyEquipment />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/equipment/:id/edit" element={<EditEquipment />} />

        <Route path="my-bookings" element={<MyBookings/>} />
        <Route path="rental-requests" element={<OwnerBookings/>} />


        <Route path="/test/map" element={<MapTest/>}/>
      </Route>
    </Routes>
  );
}

export default App;
