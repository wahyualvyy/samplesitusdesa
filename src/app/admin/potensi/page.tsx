"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit2, Trash2, Eye, Map, Store, Package, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUmkmList, getTourismList, deleteUmkm, deleteTourism } from "@/actions/potensi";

export default function AdminPotensiPage() {
  const [potensi, setPotensi] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const loadData = async () => {
    const umkms = await getUmkmList();
    const tourisms = await getTourismList();
    
    // Normalize properties to match the UI expectation
    const normalizedUmkm = umkms.map((u: any) => ({ ...u, type: 'umkm', nama: u.name, pemilik: u.ownerName, kategori: u.category }));
    const normalizedTourism = tourisms.map((t: any) => ({ ...t, type: 'potensi', nama: t.name, pemilik: 'Desa', kategori: 'Wisata' }));
    
    setPotensi([...normalizedUmkm, ...normalizedTourism]);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, type: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data potensi ini?")) {
      if (type === 'umkm') {
        await deleteUmkm(id);
      } else {
        await deleteTourism(id);
      }
      loadData();
    }
  };

  const filteredPotensi = potensi.filter(p => {
    const itemName = p.nama || (p as any).name || "";
    return itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Potensi & UMKM</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data potensi unggulan desa dan daftar UMKM warga.</p>
        </div>
        
        <Link 
          href="/admin/potensi/create"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Potensi Baru
        </Link>
      </div>

      {/* Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Item</div>
            <div className="text-2xl font-bold text-gray-900">{potensi.length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama potensi/UMKM..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPotensi.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <Image 
                src={item.image || "https://picsum.photos/seed/picsum/400/300"} 
                alt={item.nama || (item as any).name || "Potensi"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                {item.kategori}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{item.nama || (item as any).name}</h3>
              <div className="text-sm text-gray-500 mb-4">Oleh: {item.pemilik || (item as any).pengelola || (item as any).owner}</div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                  Aktif
                </span>
                
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link href={`/admin/potensi/create?id=${item.id}&type=${item.type}`} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-block">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(item.id, item.type)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPotensi.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            Tidak ada data potensi yang ditemukan.
          </div>
        )}
      </div>

    </div>
  );
}
