import { FileSearch, Download, Info, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PPIDPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileSearch className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">PPID Desa Contoh</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Pejabat Pengelola Informasi dan Dokumentasi (PPID). Komitmen kami mewujudkan pemerintahan desa yang terbuka, transparan, dan akuntabel.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-12">
        
        {/* Info Banner */}
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="shrink-0">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <ShieldCheck className="w-10 h-10" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Hak Anda Atas Informasi Publik</h2>
            <p className="text-blue-100 leading-relaxed">
              Berdasarkan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik, setiap warga negara berhak untuk memperoleh informasi publik. PPID Desa Contoh menyediakan berbagai dokumen publik yang dapat diakses secara langsung.
            </p>
          </div>
        </div>

        {/* Categories of Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Informasi Berkala</h3>
            <p className="text-gray-500 text-sm mb-6">Informasi yang wajib diperbaharui secara rutin, seperti profil desa, laporan keuangan (APBDes), dan program kerja.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Rencana Pembangunan</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Laporan Realisasi Anggaran</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Informasi Serta Merta</h3>
            <p className="text-gray-500 text-sm mb-6">Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum jika tidak segera diumumkan.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div> Peringatan Bencana Alam</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div> Informasi Wabah Penyakit</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Informasi Setiap Saat</h3>
            <p className="text-gray-500 text-sm mb-6">Informasi yang harus tersedia dan dapat diakses oleh publik kapanpun diminta sesuai dengan prosedur.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div> Peraturan Desa (Perdes)</li>
              <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div> SK Kepala Desa</li>
            </ul>
          </div>

        </div>

        {/* Public Documents Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">Dokumen Informasi Publik</h2>
            <input 
              type="text" 
              placeholder="Cari dokumen..." 
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700">Judul Dokumen</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Tahun</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Peraturan Desa No. 4 tentang APBDes 2026</td>
                  <td className="px-6 py-4">Informasi Setiap Saat</td>
                  <td className="px-6 py-4 text-gray-500">2026</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Unduh
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Laporan Penyelenggaraan Pemerintahan Desa (LPPD)</td>
                  <td className="px-6 py-4">Informasi Berkala</td>
                  <td className="px-6 py-4 text-gray-500">2025</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Unduh
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">RPJMDes 2022-2028 Desa Contoh</td>
                  <td className="px-6 py-4">Informasi Setiap Saat</td>
                  <td className="px-6 py-4 text-gray-500">2022</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Unduh
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
