"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, PlayCircle, MapPin } from "lucide-react";

const fallbackGalleryItems = [
  { id: 1, title: "Lomba Desa Tingkat Kabupaten", category: "Pemerintahan", type: "photo", height: "h-80", image: "https://picsum.photos/seed/300/800/800" },
  { id: 2, title: "Panen Raya Padi Sawah", category: "Pertanian", type: "photo", height: "h-48", image: "https://picsum.photos/seed/301/800/800" },
  { id: 3, title: "Festival Budaya Pesisir", category: "Wisata", type: "video", height: "h-64", image: "https://picsum.photos/seed/302/800/800" },
  { id: 4, title: "Kerja Bakti Pembangunan Masjid", category: "Sosial", type: "photo", height: "h-64", image: "https://picsum.photos/seed/303/800/800" },
  { id: 5, title: "Kunjungan Studi Banding", category: "Pemerintahan", type: "photo", height: "h-48", image: "https://picsum.photos/seed/304/800/800" },
  { id: 6, title: "Pelatihan Keterampilan UMKM", category: "Ekonomi", type: "photo", height: "h-80", image: "https://picsum.photos/seed/305/800/800" },
  { id: 7, title: "Penyaluran Bantuan Langsung Tunai", category: "Sosial", type: "photo", height: "h-64", image: "https://picsum.photos/seed/306/800/800" },
  { id: 8, title: "Kegiatan Posyandu Melati", category: "Kesehatan", type: "photo", height: "h-64", image: "https://picsum.photos/seed/307/800/800" },
  { id: 9, title: "Pembukaan Turnamen Voli Kades Cup", category: "Olahraga", type: "video", height: "h-48", image: "https://picsum.photos/seed/308/800/800" },
];

import { getGaleriList } from "@/actions/berita";

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);
  const [activeFilter, setActiveFilter] = useState("Semua Album");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGaleriList();
        if (data && data.length > 0) {
          const mapped = data.map((item: any, index: number) => ({
            id: item.id,
            title: item.title,
            category: item.category || "Umum",
            type: "photo",
            height: index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-48" : "h-64",
            image: item.imageUrl || "https://picsum.photos/seed/300/800/800"
          }));
          if (mapped.length > 0) {
            setGalleryItems(mapped);
          }
        }
      } catch (e) {}
    };
    fetchData();
  }, []);

  const categories = ['Semua Album', 'Pemerintahan', 'Pertanian', 'Wisata', 'Sosial', 'Ekonomi', 'Kesehatan', 'Olahraga', 'Infrastruktur', 'Pembangunan'];

  const filteredItems = activeFilter === "Semua Album" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Header */}
      <div className="border-b border-gray-200 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Galeri Desa</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Dokumentasi visual berbagai kegiatan pemerintahan, pembangunan, kemasyarakatan, dan potensi wisata Desa Contoh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === cat ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid (CSS Columns or Flex wrap) */}
        {/* Using CSS columns for a true masonry effect without JS */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          
          {filteredItems.map((item, index) => (
            <div key={item.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 mb-6">
              
              <div className={`relative w-full ${item.height} min-h-[200px]`}>
                <Image 
                  src={item.image}
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                
                {item.type === 'video' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 text-white">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                  </div>
                )}

                <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2 w-max">
                  {item.category}
                </span>
                <h3 className="text-white font-heading font-bold text-lg leading-tight">
                  {item.title}
                </h3>
                <div className="flex items-center text-white/70 text-xs mt-2">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Desa Contoh
                </div>
              </div>

            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 w-full">
              Tidak ada foto galeri dalam kategori ini.
            </div>
          )}

        </div>
        
        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 shadow-lg transition-all hover:-translate-y-1">
            Muat Lebih Banyak Foto
          </button>
        </div>

      </div>
    </div>
  );
}
