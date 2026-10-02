"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ChevronRight, Search } from "lucide-react";

const initialNews = [
  { id: 1, title: "Pembangunan Jalan Desa Sepanjang 2 KM Selesai", category: "Pembangunan", status: "Terbit", date: "24 Sep 2026", views: 1250, content: "Pemerintah desa telah sukses merampungkan proyek pengaspalan jalan dusun sepanjang 2 kilometer. Hal ini diharapkan mampu meningkatkan roda perekonomian warga..." },
  { id: 2, title: "Penyaluran BLT Dana Desa Tahap 3", category: "Sosial", status: "Terbit", date: "20 Sep 2026", views: 840, content: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa tahap 3 telah disalurkan kepada 120 Keluarga Penerima Manfaat (KPM). Proses penyaluran berjalan lancar di balai desa." },
  { id: 4, title: "Persiapan Lomba Desa Tingkat Kabupaten", category: "Kegiatan", status: "Terbit", date: "15 Sep 2026", views: 2100, content: "Desa kita terpilih mewakili kecamatan dalam lomba desa tingkat kabupaten. Berbagai persiapan mulai dari kebersihan lingkungan dan administrasi sedang digalakkan." },
];

import { getBeritaList } from "@/actions/berita";

export default function BeritaPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBeritaList();
        if (data && data.length > 0) {
           const formatted = data.map((n: any) => ({
             id: n.id,
             title: n.title,
             category: n.category?.name || "Umum",
             status: n.isPublished ? "Terbit" : "Draft",
             date: new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
             views: Math.floor(Math.random() * 1000) + 100, // Mock views
             content: n.content,
             slug: n.slug
           }));
           setNewsList(formatted.filter((n: any) => n.status === "Terbit"));
        } else {
           setNewsList(initialNews.filter(n => n.status === "Terbit"));
        }
      } catch (e) {
        setNewsList(initialNews.filter(n => n.status === "Terbit"));
      }
    };
    fetchData();
  }, []);

  const categories = ['Semua', ...Array.from(new Set(newsList.map(n => n.category)))];

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || news.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Portal Berita Desa</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru, program kerja, dan informasi terkini langsung dari Pemerintah Desa Contoh.
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
              placeholder="Cari judul atau isi berita..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Link href={`/informasi/berita/${news.slug || news.id}`} key={news.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/50 transition-all group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={`https://picsum.photos/seed/${news.id}/800/600`} 
                  alt={news.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-primary uppercase tracking-wider">
                  {news.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {news.content}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-primary font-bold">
                    <span>Baca</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredNews.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-500">
                Tidak ada berita yang ditemukan.
             </div>
          )}
        </div>

        {/* Pagination (Hidden if empty) */}
        {filteredNews.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>Sebelumnnya</button>
              <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg shadow-sm">1</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>Selanjutnya</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
