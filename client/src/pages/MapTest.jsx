import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import loading from "../assets/logo.jpg"

const MapTest = () => {
  const position = [22.6241504, 88.4306945]; // Kolkata

  return (
    <div className="animate-bounce">
      <h2>My Map</h2>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Hello from Kolkata! 📍</Popup>
        </Marker>
      </MapContainer>


      <div className="px-89 py-30 "> 
        <div className="size-20 border-4 flex justify-center items-center animate-pulse">
          <div className="size-10 rounded-full border-b-4 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default MapTest;
