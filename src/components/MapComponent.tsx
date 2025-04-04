"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const position: [number, number] = [-17.5516, -149.5584];

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/assets/leaflet/marker-icon-2x.png",
      iconUrl: "/assets/leaflet/marker-icon.png",
      shadowUrl: "/assets/leaflet/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          Géopolynésie
          <br />
          Papeete, Polynésie Française
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
