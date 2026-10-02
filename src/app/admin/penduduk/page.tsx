"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Eye, MapPin, User, Users } from "lucide-react";
import Link from "next/link";
import { getResidentList, deleteResident } from "@/actions/penduduk";

export default function AdminPendudukPage() {
  const [penduduk, setPenduduk] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const data = await getResidentList();
    setPenduduk(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data penduduk ini?")) {
      await deleteResident(id);
      loadData();
    }
  };

  const filteredPenduduk = penduduk.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.nik.includes(searchTerm)
  );

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Data Penduduk</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data kependudukan, demografi, dan statistik warga desa.</p>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            href="/admin/penduduk/kk/create"
            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2 text-gray-400" />
            Tambah Kartu Keluarga
          </Link>
          <Link 
            href="/admin/penduduk/create"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Data Warga
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Terdata</div>
            <div className="text-2xl font-bold text-gray-900">{penduduk.length}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Laki-laki</div>
            <div className="text-2xl font-bold text-gray-900">{penduduk.filter(p => p.gender === 'Laki-laki').length}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Perempuan</div>
            <div className="text-2xl font-bold text-gray-900">{penduduk.filter(p => p.gender === 'Perempuan').length}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Dusun Unik</div>
            <div className="text-2xl font-bold text-gray-900">{new Set(penduduk.map(p => p.dusun)).size}</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan NIK atau Nama..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">J.Kelamin / Usia</th>
                <th className="px-6 py-4">Dusun</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPenduduk.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-gray-600">{item.nik}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{item.nama}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{item.gender} • {item.usia} thn</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.dusun}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Aktif" ? "bg-green-100 text-green-700" :
                      item.status === "Pindah" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/penduduk/create?id=${item.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredPenduduk.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada data warga ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
