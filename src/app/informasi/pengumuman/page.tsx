"use client";

import { useEffect, useState } from "react";
import { Megaphone, Calendar, FileText, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

const defaultAnnouncements = [
  {
    id: 1,
    title: "Pemberitahuan Pemadaman Listrik Sementara",
    date: "12 Okt 2026",
    status: "Penting",
    content: "Sehubungan dengan adanya perbaikan jaringan SUTM oleh PLN, akan dilakukan pemadaman listrik pada hari Minggu, 15 Oktober 2026 dari pukul 09.00 - 14.00 WITA untuk wilayah Dusun I dan II.",
    hasAttachment: false
  },
  {
    id: 2,
    title: "Jadwal Posyandu Balita & Lansia Bulan Oktober",
    date: "08 Okt 2026",
    status: "Rutin",
    content: "Diberitahukan kepada seluruh warga, kegiatan Posyandu Balita (Melati) dan Lansia (Kenanga) akan dilaksanakan secara serentak pada tanggal 10 Oktober 2026 bertempat di Balai Pertemuan Desa.",
    hasAttachment: true
  },
  {
    id: 3,
    title: "Pembukaan Pendaftaran Penerima Bantuan RTLH",
    date: "01 Okt 2026",
    status: "Penting",
    content: "Pemerintah Desa Contoh membuka pendaftaran bagi warga yang rumahnya memenuhi kriteria Rumah Tidak Layak Huni (RTLH) untuk diusulkan dalam program bedah rumah tahun 2027.",
    hasAttachment: true
  },
  {
    id: 4,
    title: "Undangan Musyawarah Perencanaan Pembangunan (Musrenbang)",
    date: "25 Sep 2026",
    status: "Selesai",
    content: "Mengundang seluruh Ketua RT, RW, Tokoh Masyarakat, dan unsur kelembagaan desa untuk hadir dalam Musrenbang Desa penetapan RKPDes Tahun 2027.",
    hasAttachment: false
  }
];

import { getPengumumanList } from "@/actions/berita";

export default function PengumumanPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPengumumanList();
        if (data && data.length > 0) {
           const formatted = data.map((n: any) => ({
             id: n.id,
             title: n.title,
             status: n.status || "Biasa",
             date: new Date(n.date || n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
             content: n.content,
             hasAttachment: false
           }));
           setAnnouncements(formatted);
           return;
        }
      } catch (e) {}
      setAnnouncements(defaultAnnouncements);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
            <Megaphone className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Pengumuman Desa</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Informasi resmi, surat edaran, dan pemberitahuan penting dari Pemerintah Desa Contoh kepada masyarakat.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="space-y-6">
          {announcements.map((item) => {
            const priority = item.priority || (['Terbit', 'Draf', 'Menunggu Review'].includes(item.status) ? 'Biasa' : item.status);
            
            return (
            <Link href={`/informasi/pengumuman/${item.id}`} key={item.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 transition-all hover:shadow-md relative overflow-hidden group block">
              
              {/* Status Indicator */}
              <div className={`absolute top-0 left-0 w-2 h-full ${
                priority === 'Penting' ? 'bg-red-500' : 
                priority === 'Rutin' ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pl-4">
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      priority === 'Penting' ? 'bg-red-100 text-red-700' : 
                      priority === 'Rutin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {priority}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {item.date}
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                  
                  {item.hasAttachment && (
                    <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mt-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>Lihat Detail & Lampiran</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-2 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                  )}
                  {!item.hasAttachment && (
                    <div className="inline-flex items-center space-x-2 text-sm font-medium text-primary mt-2">
                      <span>Baca Selengkapnya</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                    </div>
                  )}
                </div>

              </div>
            </Link>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 shadow-sm transition-colors">
            Muat Pengumuman Terdahulu
          </button>
        </div>
      </div>
    </div>
  );
}
