"use client";

import dynamic from "next/dynamic";
import { MapPin, Search } from "lucide-react";

// Dynamically import the map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function InteractiveMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Peta Desa Contoh</h2>
            <p className="text-muted-foreground max-w-2xl">
              Jelajahi lokasi-lokasi penting, fasilitas umum, dan destinasi wisata di Desa Contoh melalui peta interaktif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex flex-col space-y-4">
            <div className="bg-muted p-5 rounded-2xl">
              <h3 className="font-heading font-bold mb-4">Kategori Lokasi</h3>
              
              <div className="space-y-3">
                {['Kantor Pemerintahan', 'Fasilitas Umum', 'Sekolah', 'Tempat Ibadah', 'Wisata', 'UMKM'].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-border/50 cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="text-sm font-medium">{item}</span>
                    <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" defaultChecked={i < 3} />
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="w-full h-[500px] bg-muted rounded-2xl overflow-hidden border border-border/60 shadow-sm relative z-0">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
