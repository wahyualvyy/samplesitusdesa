"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Map, Phone, MapPin, Users, Ticket } from "lucide-react";

import { getTourismList } from "@/actions/potensi";

export default function WisataPage() {
  const [wisataList, setWisataList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTourismList();
        if (data && data.length > 0) {
          setWisataList(data);
        }
      } catch (e) {}
    };
    fetchData();
  }, []);

  const categories = ['Semua', ...Array.from(new Set(wisataList.map(n => n.kategori || "Wisata")))];

  const filteredWisata = wisataList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const itemCat = item.category || "Wisata";
    const matchesCategory = activeCategory === "Semua" || itemCat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8FAF9] min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10 text-center text-white">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Map className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Pesona Wisata Desa</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Temukan keindahan alam yang memukau, kekayaan budaya yang otentik, dan keramahan warga lokal yang akan memberikan pengalaman liburan tak terlupakan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-[-2rem] relative z-20">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari destinasi wisata..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat as string)}
                className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wisata Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredWisata.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col sm:flex-row">
              {/* Image Section */}
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-gray-100 shrink-0">
                <Image 
                  src={item.image || `https://picsum.photos/seed/${item.id+50}/600/800`}
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-sm uppercase tracking-wider">
                  {item.category || "Wisata"}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3 group-hover:text-primary transition-colors">{item.name}</h3>
                
                <div className="flex items-start text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item.location || "Desa Contoh"}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {item.description || "Destinasi wisata unggulan desa dengan pemandangan menakjubkan dan fasilitas lengkap untuk rekreasi bersama keluarga."}
                </p>
                
                <div className="mt-auto grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1 flex items-center"><Users className="w-3 h-3 mr-1" /> Pengelola</div>
                    <div className="text-sm font-bold text-gray-900">{item.pemilik || "Pemerintah Desa"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1 flex items-center"><Ticket className="w-3 h-3 mr-1" /> Tiket Masuk</div>
                    <div className="text-sm font-bold text-primary">{item.price || "Gratis"}</div>
                  </div>
                </div>

                <a href={`https://wa.me/${item.kontak}`} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 w-full py-3 bg-[#25D366] text-white hover:bg-[#1EBE5D] font-medium rounded-xl transition-colors shadow-lg shadow-[#25D366]/20">
                  <Phone className="w-5 h-5" />
                  <span>Info & Reservasi</span>
                </a>
              </div>
            </div>
          ))}
          
          {filteredWisata.length === 0 && (
             <div className="col-span-full py-24 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Destinasi Belum Tersedia</h3>
                <p className="text-gray-500">Silakan tambahkan data potensi wisata melalui Admin Panel.</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
