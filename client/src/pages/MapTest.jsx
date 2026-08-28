import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapTest = () => {
  const position = [22.6241504, 88.4306945]; // Kolkata

  return (
    <div>
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
    </div>
  );
};

export default MapTest;
