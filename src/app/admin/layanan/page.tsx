"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, LayoutGrid, ArrowUpDown,
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, Building2, BookOpen,
  Map, Phone, Mail, Star
} from "lucide-react";
import { getAllVillageServices, deleteVillageService, toggleVillageService } from "@/actions/layanan";

const iconMap: Record<string, React.ElementType> = {
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, LayoutGrid, Building2,
  BookOpen, Map, Phone, Mail, Star,
};

export default function AdminLayananPage() {
  const [services, setServices] = useState<any[]>([]);

  const loadData = async () => {
    const data = await getAllVillageServices();
    setServices(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Hapus layanan "${title}"? Tindakan ini tidak bisa dibatalkan.`)) {
      await deleteVillageService(id);
      loadData();
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleVillageService(id, !current);
    loadData();
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Manajemen Layanan Desa</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola layanan publik yang tampil di halaman Beranda dan Portal Layanan.</p>
        </div>
        <Link
          href="/admin/layanan/create"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Layanan
        </Link>
      </div>

      {/* Info Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <LayoutGrid className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <strong>Tip:</strong> Layanan yang <strong>dinonaktifkan</strong> tidak akan tampil di Portal Publik maupun Beranda. Gunakan tombol mata untuk toggle visibilitas tanpa menghapus data.
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">#</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Layanan</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold hidden md:table-cell">Deskripsi</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Link</th>
                <th className="text-center px-6 py-4 text-gray-500 font-semibold">Status</th>
                <th className="text-center px-6 py-4 text-gray-500 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc, idx) => {
                const Icon = iconMap[svc.icon] || LayoutGrid;
                return (
                  <tr key={svc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-medium">{svc.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${svc.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-gray-900">{svc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs">
                      <p className="line-clamp-2">{svc.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{svc.href}</code>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${svc.isVisible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {svc.isVisible ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleToggle(svc.id, svc.isVisible)}
                          title={svc.isVisible ? "Nonaktifkan" : "Aktifkan"}
                          className={`p-2 rounded-lg transition-colors ${svc.isVisible ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-gray-400 bg-gray-50 hover:bg-gray-100"}`}
                        >
                          {svc.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/layanan/create?id=${svc.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(svc.id, svc.title)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {services.length === 0 && (
            <div className="py-16 text-center text-gray-500">
              <LayoutGrid className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p>Belum ada data layanan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
