"use client";

import { HeartHandshake, Search, CheckCircle2, AlertCircle } from "lucide-react";

export default function BansosPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-rose-500/20 text-rose-300 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-rose-400/20">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Layanan Bantuan Sosial</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Informasi mengenai program Bantuan Sosial (Bansos) dari Pemerintah Pusat, Daerah, maupun Dana Desa.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-12">
        
        {/* NIK Checker Simulation */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center relative overflow-hidden -mt-24 z-20">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-primary"></div>
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Cek Status Penerima Bansos</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Masukkan Nomor Induk Kependudukan (NIK) Anda untuk mengecek apakah Anda terdaftar sebagai penerima manfaat tahun ini.
          </p>
          
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Masukkan 16 digit NIK..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-center md:text-left text-lg tracking-widest font-mono"
                maxLength={16}
              />
            </div>
            <button type="submit" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap">
              Cek NIK
            </button>
          </form>
        </div>

        {/* Jenis Bantuan */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">Program Bantuan Sosial Berjalan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">BLT Dana Desa (BLT-DD)</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Bantuan Langsung Tunai yang bersumber dari Dana Desa, ditujukan bagi warga miskin ekstrem yang kehilangan mata pencaharian dan belum menerima bantuan lain.
                </p>
                <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Penyaluran Aktif</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Program Keluarga Harapan (PKH)</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Bantuan sosial bersyarat dari Kemensos kepada Keluarga Miskin (KM) yang ditetapkan sebagai keluarga penerima manfaat, difokuskan untuk ibu hamil, balita, anak sekolah, dan lansia.
                </p>
                <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Penyaluran Aktif</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Bantuan Pangan Non Tunai (BPNT)</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Bantuan pangan (sembako) yang diberikan pemerintah secara non-tunai setiap bulan kepada KPM (Keluarga Penerima Manfaat) melalui mekanisme akun elektronik.
                </p>
                <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">Menunggu Jadwal</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
