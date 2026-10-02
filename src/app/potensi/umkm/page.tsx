"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Phone, ShoppingBag, MapPin } from "lucide-react";

import { getUmkmList } from "@/actions/potensi";

export default function UMKMPage() {
  const [umkmList, setUmkmList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUmkmList();
        if (data && data.length > 0) {
          setUmkmList(data.filter((item: any) => item.type === 'umkm'));
        }
      } catch (e) {}
    };
    fetchData();
  }, []);

  const categories = ['Semua', ...Array.from(new Set(umkmList.map(n => n.kategori || "UMKM")))];

  const filteredUmkm = umkmList.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.pemilik || "").toLowerCase().includes(searchTerm.toLowerCase());
    const itemCat = item.kategori || "UMKM";
    const matchesCategory = activeCategory === "Semua" || itemCat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Katalog UMKM Desa</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Dukung perekonomian lokal dengan membeli produk-produk unggulan karya warga Desa Contoh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari produk atau nama pemilik..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat as string)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* UMKM Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUmkm.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image 
                  src={item.image || `https://picsum.photos/seed/${item.id+20}/400/300`}
                  alt={item.nama} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary shadow-sm">
                  {item.kategori || "UMKM"}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-lg mb-1 text-gray-900 leading-tight">{item.nama}</h3>
                <p className="text-xs text-gray-500 mb-3 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1.5">
                    <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  {item.pemilik}
                </p>
                <div className="text-primary font-bold mb-4 text-lg">{item.price}</div>
                <a href={`https://wa.me/${item.kontak}`} target="_blank" rel="noreferrer" className="mt-auto flex items-center justify-center space-x-2 w-full py-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white font-medium rounded-xl transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Pesan via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
          
          {filteredUmkm.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-500">
                Tidak ada produk UMKM yang ditemukan.
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
