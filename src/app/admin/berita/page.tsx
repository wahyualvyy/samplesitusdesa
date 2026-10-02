"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Eye, FileText, CheckCircle2, XCircle, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBeritaList, getPengumumanList, getGaleriList, deleteBerita, deletePengumuman, deleteGaleri } from "@/actions/berita";

export default function AdminBeritaPage() {
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "galeri">("berita");
  const [news, setNews] = useState<any[]>([]);
  const [pengumuman, setPengumuman] = useState<any[]>([]);
  const [galeri, setGaleri] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const n = await getBeritaList();
      const p = await getPengumumanList();
      const g = await getGaleriList();
      
      setNews(n.map(item => ({
        ...item,
        date: item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      })));
      setPengumuman(p.map(item => ({
        ...item,
        date: item.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      })));
      setGaleri(g.map(item => ({
        ...item,
        date: item.id ? "2026" : "Unknown",
        image: item.imageUrl
      })));
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${activeTab} ini?`)) {
      if (activeTab === "berita") {
        await deleteBerita(id);
        setNews(news.filter(n => n.id !== id));
      } else if (activeTab === "pengumuman") {
        await deletePengumuman(id);
        setPengumuman(pengumuman.filter(p => p.id !== id));
      } else {
        await deleteGaleri(id);
        setGaleri(galeri.filter(g => g.id !== id));
      }
    }
  };

  const currentData = activeTab === "berita" ? news : activeTab === "pengumuman" ? pengumuman : galeri;
  const filteredData = currentData.filter((n: any) => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            Kelola {activeTab === "berita" ? "Berita" : activeTab === "pengumuman" ? "Pengumuman" : "Galeri"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Publikasi dan manajemen {activeTab === "berita" ? "artikel berita" : activeTab === "pengumuman" ? "pengumuman" : "foto galeri"} portal desa.
          </p>
        </div>
        
        <Link 
          href={`/admin/berita/create?type=${activeTab}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          {activeTab === "galeri" ? "Unggah Galeri Baru" : `Tulis ${activeTab === "berita" ? "Berita" : "Pengumuman"} Baru`}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => { setActiveTab("berita"); setSearchTerm(""); }}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "berita" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
        >
          Berita
          {activeTab === "berita" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
        <button
          onClick={() => { setActiveTab("pengumuman"); setSearchTerm(""); }}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "pengumuman" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
        >
          Pengumuman
          {activeTab === "pengumuman" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
        <button
          onClick={() => { setActiveTab("galeri"); setSearchTerm(""); }}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "galeri" ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
        >
          Galeri
          {activeTab === "galeri" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2 w-full md:w-96">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Cari judul ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {activeTab === "galeri" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item: any) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-48 w-full bg-gray-200">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <a href={item.image} target="_blank" rel="noreferrer" title="Preview" className="p-2 bg-white text-gray-700 rounded-full hover:text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </a>
                  <Link href={`/admin/berita/create?id=${item.id}&type=galeri`} title="Edit" className="p-2 bg-white text-gray-700 rounded-full hover:text-blue-500 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(item.id)} title="Hapus" className="p-2 bg-white text-gray-700 rounded-full hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 line-clamp-2">{item.title}</h3>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              Tidak ada data galeri yang sesuai.
            </div>
          )}
        </div>
      ) : (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-center">Dilihat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 line-clamp-1">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {typeof item.category === 'object' ? item.category?.name || "Umum" : item.category || "Umum"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {item.status === "Terbit" || item.status === "Penting" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <FileText className="w-4 h-4 text-amber-500 mr-2" />
                      )}
                      <span className={item.status === "Terbit" || item.status === "Penting" ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center text-gray-500">
                      <Eye className="w-4 h-4 mr-1.5" />
                      {item.views || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Link href={activeTab === 'berita' ? `/informasi/berita/${item.slug}` : `/informasi/pengumuman/${item.id}`} target="_blank" title="Preview" className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/berita/create?id=${item.id}&type=${activeTab}`} title="Edit" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} title="Hapus" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada {activeTab} yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
      
    </div>
  );
}
