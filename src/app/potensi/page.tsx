"use client";

import Image from "next/image";
import { Compass, ShoppingBag, Map, ArrowRight, Wheat, Ship, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";

const defaultUmkm = [
  { id: 1, nama: "Kerajinan Bambu Pak Yanto", kategori: "UMKM", pemilik: "Pak Yanto", price: "Mulai Rp 50.000", status: "Aktif", kontak: "6281234567890", image: "https://picsum.photos/seed/p1/800/600", type: "umkm" },
  { id: 2, nama: "Kopi Khas Bukit Hijau", kategori: "Pertanian", pemilik: "Kelompok Tani", price: "Rp 35.000 / pack", status: "Aktif", kontak: "6282345678901", image: "https://picsum.photos/seed/p2/800/600", type: "umkm" },
  { id: 3, nama: "Keripik Pisang Berkah", kategori: "UMKM", pemilik: "Ibu Sumiati", price: "Rp 15.000", status: "Aktif", kontak: "6283456789012", image: "https://picsum.photos/seed/umkm1/400/300", type: "umkm" },
  { id: 4, nama: "Sirup Mangrove", kategori: "UMKM", pemilik: "KWT Melati", price: "Rp 30.000", status: "Aktif", kontak: "6284567890123", image: "https://picsum.photos/seed/umkm4/400/300", type: "umkm" },
  { id: 5, nama: "Wisata Air Terjun Desa", kategori: "Wisata Alam", pemilik: "BUMDes", price: "Rp 5.000", status: "Aktif", kontak: "628999999999", image: "https://picsum.photos/seed/p5/800/600", type: "potensi", deskripsi: "Destinasi wisata alam menakjubkan yang menawarkan pemandangan air terjun jernih, udara segar pegunungan, dan jalur trekking yang aman. Spot favorit warga dan pengunjung luar daerah.", alamat: "Jl. Raya Pegunungan Km 4, Dusun 3" },
  { id: 6, nama: "Puncak Bukit Bintang", kategori: "Wisata Alam", pemilik: "Pokdarwis", price: "Rp 10.000", status: "Aktif", kontak: "628888888888", image: "https://picsum.photos/seed/p6/800/600", type: "potensi", deskripsi: "Nikmati pemandangan matahari terbit dan hamparan lampu kota di malam hari dari puncak bukit. Dilengkapi dengan area berkemah dan spot foto estetik.", alamat: "Dusun 1, Desa Contoh Atas" },
  { id: 7, nama: "Kampung Budaya Lestari", kategori: "Wisata Budaya", pemilik: "Pemdes", price: "Rp 15.000", status: "Aktif", kontak: "628777777777", image: "https://picsum.photos/seed/p7/800/600", type: "potensi", deskripsi: "Pusat pelestarian seni tari, kerajinan lokal, dan rumah adat tradisional. Pengunjung dapat belajar membatik dan menonton pertunjukan gamelan secara langsung.", alamat: "Kompleks Adat Dusun 2" }
];

import { getUmkmList, getTourismList } from "@/actions/potensi";

export default function PotensiPage() {
  const [umkmList, setUmkmList] = useState(defaultUmkm);
  const [wisataData, setWisataData] = useState<any[]>(defaultUmkm.filter(item => item.type === "potensi" || (item.kategori && item.kategori.toLowerCase().includes("wisata"))));
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [umkmData, tourismData] = await Promise.all([
          getUmkmList(),
          getTourismList()
        ]);
        
        if (umkmData && umkmData.length > 0) {
          const normalizedUmkm = umkmData.map((u: any) => ({ 
            ...u, 
            type: 'umkm', 
            nama: u.name, 
            pemilik: u.ownerName, 
            kategori: u.category,
            deskripsi: u.description,
            kontak: u.phone
          }));
          setUmkmList(normalizedUmkm as any);
        }
        if (tourismData && tourismData.length > 0) {
          const normalizedTourism = tourismData.map((t: any) => ({ 
            ...t, 
            type: 'potensi', 
            nama: t.name, 
            pemilik: 'Desa Simoketawang', 
            kategori: 'Wisata',
            deskripsi: t.description,
            alamat: t.location
          }));
          setWisataData(normalizedTourism as any);
        }
      } catch (e) {
        // Fallback to defaultUmkm on error
      }
    };
    fetchData();
  }, []);

  const wisataList = wisataData;
  const produkList = umkmList.filter(item => item.type !== "potensi" && !(item.kategori && item.kategori.toLowerCase().includes("wisata")));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === wisataList.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? wisataList.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* Header */}
      <div className="bg-[#0f3d21] py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Potensi Desa</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Menjelajahi kekayaan alam, produk kreatif warga, dan pesona wisata unggulan di Desa Contoh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 space-y-24">

        {/* Potensi Alam */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900">Kekayaan Alam Desa</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center group hover:bg-green-50 transition-colors">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wheat className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sektor Pertanian</h3>
              <p className="text-gray-600 leading-relaxed">
                Desa Contoh memiliki lahan persawahan tadah hujan seluas 45 hektar yang memproduksi beras berkualitas tinggi. Sektor ini menjadi salah satu penopang utama ketahanan pangan warga.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center group hover:bg-blue-50 transition-colors">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Ship className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sektor Perikanan Pesisir</h3>
              <p className="text-gray-600 leading-relaxed">
                Berada di garis pantai, mayoritas penduduk pesisir bermata pencaharian sebagai nelayan tangkap dan pembudidaya ikan tambak dengan potensi tangkapan laut yang melimpah.
              </p>
            </div>
          </div>
        </section>

        {/* Wisata */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 text-primary font-bold mb-2 uppercase tracking-wider text-sm">
                <Map className="w-5 h-5" />
                <span>Destinasi Wisata</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Pesona Wisata Alam</h2>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0">
              <Image 
                src="https://picsum.photos/seed/wisata/1600/900" 
                alt="Pesona Wisata" 
                fill 
                className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 w-full md:w-1/2"></div>
            </div>
            
            <div className="relative p-10 md:p-16 z-10 flex flex-col md:w-1/2">
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Eksplorasi Keindahan Desa Contoh</h3>
              <p className="text-white/80 leading-relaxed mb-8">
                Temukan berbagai destinasi wisata menarik, mulai dari wisata alam, agrowisata, hingga wisata edukasi yang dikelola langsung oleh warga desa.
              </p>
              <Link 
                href="/potensi/wisata"
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all w-max shadow-lg shadow-primary/20"
              >
                <span>Lihat Katalog Wisata</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Produk UMKM */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 text-accent font-bold mb-2 uppercase tracking-wider text-sm">
                <ShoppingBag className="w-5 h-5" />
                <span>UMKM & Ekonomi Kreatif</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">Katalog Produk Lokal</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produkList.map((item) => {
              const itemName = item.nama || (item as any).name;
              const itemOwner = item.pemilik || (item as any).owner;
              const itemContact = item.kontak || (item as any).contact;
              return (
              <a
                key={item.id}
                href={`https://wa.me/${itemContact}?text=${encodeURIComponent(`Halo ${itemOwner}, saya melihat produk ${itemName} di Website Direktori Desa Contoh dan tertarik untuk memesan.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={itemName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-green-600 uppercase tracking-wide border border-green-100">
                    Hubungi Penjual
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">{itemName}</h3>
                  <p className="text-sm text-gray-500 mb-4">{itemOwner}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">{item.price || "Harga Menyesuaikan"}</span>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors text-green-600">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>
                </div>
              </a>
            )})}
          </div>
        </section>

      </div>
    </div>
  );
}
