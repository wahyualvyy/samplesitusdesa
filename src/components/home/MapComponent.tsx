"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing marker icons in leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const defaultLocations = [
  { id: 1, name: "Kantor Desa Contoh", lat: -0.1234, lng: 117.1234, type: "Pemerintahan" },
  { id: 2, name: "Pantai Contoh", lat: -0.1250, lng: 117.1300, type: "Wisata" },
  { id: 3, name: "Masjid Jami Contoh", lat: -0.1220, lng: 117.1250, type: "Fasilitas Umum" },
  { id: 4, name: "SDN 001 Contoh", lat: -0.1210, lng: 117.1220, type: "Pendidikan" },
];

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const [locations, setLocations] = useState(defaultLocations);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-muted flex items-center justify-center">Memuat Peta...</div>;

  // Auto center on first location
  const center: [number, number] = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : [-0.1234, 117.1234];

  return (
    <MapContainer 
      center={center} 
      zoom={14} 
      scrollWheelZoom={false}
      className="w-full h-full z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={icon}>
          <Popup>
            <div className="font-sans">
              <strong className="block mb-1 text-primary">{loc.name}</strong>
              <span className="text-xs text-muted-foreground">{loc.type}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
