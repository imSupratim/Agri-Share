import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapBox = ({ mapurl, name }) => {
  function extractLatLng(url) {
    const match = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);

    if (!match) return null;

    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }

  const coordinates = extractLatLng(mapurl);
  const position = coordinates
    ? [coordinates.lat, coordinates.lng]
    : [22.6241504, 88.4306945]; //in case any false fall back case


  // const position = [22.6241504, 88.4306945]; // Kolkata

  return (
    <div className="shadow-md hover:shadow-2xl transition-all ease-in-out">
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
          <Popup>{name} Location 📍</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapBox;
