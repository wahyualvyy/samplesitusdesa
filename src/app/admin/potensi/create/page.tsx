"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Save, Store, MapPin,
  Phone, User, Image as ImageIcon, UploadCloud, X, Map
} from "lucide-react";
import { saveUmkm, saveTourism, getUmkmList, getTourismList } from "@/actions/potensi";
import ImageUpload from "@/components/ui/ImageUpload";

function CreatePotensiForm() {
  const [activeTab, setActiveTab] = useState<"umkm" | "potensi">("umkm");
  
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("UMKM / Perdagangan");
  const [pemilik, setPemilik] = useState("");
  const [kontak, setKontak] = useState("");
  const [harga, setHarga] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams?.get("id");
    const type = searchParams?.get("type") as "umkm" | "potensi";
    
    if (id && type) {
      setEditingId(id);
      setActiveTab(type);

      const fetchData = async () => {
        if (type === "umkm") {
          const list = await getUmkmList();
          const item = list.find(u => u.id === id);
          if (item) {
            setNama(item.name);
            setPemilik(item.ownerName);
            setKategori(item.category);
            setKontak(item.phone || "");
            setDeskripsi(item.description || "");
            setImagePreview(item.image || null);
          }
        } else {
          const list = await getTourismList();
          const item = list.find(t => t.id === id);
          if (item) {
            setNama(item.name);
            setAlamat(item.location || "");
            setDeskripsi(item.description || "");
            setImagePreview(item.image || null);
          }
        }
      };
      fetchData();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!editingId) {
      if (activeTab === "umkm") setKategori("UMKM / Perdagangan");
      else setKategori("Wisata Alam");
    }
  }, [activeTab, editingId]);

  const handleSave = async () => {
    const finalImage = imagePreview || `https://picsum.photos/seed/${Date.now()}/400/300`;
    const waKontak = kontak.startsWith("0") ? "62" + kontak.substring(1) : kontak || "628000000000";

    const payload = {
      id: editingId,
      nama,
      kategori,
      pemilik,
      kontak: waKontak,
      alamat,
      deskripsi,
      image: finalImage,
    };

    if (activeTab === "umkm") {
      await saveUmkm(payload);
      alert("Data UMKM berhasil disimpan!");
    } else {
      await saveTourism(payload);
      alert("Data Potensi Wisata berhasil disimpan!");
    }
    
    router.push("/admin/potensi");
    router.refresh();
  };
  // Handled by ImageUpload component
  return (
    <div className="p-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header Actions */}
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/potensi" className="p-2 bg-white text-gray-500 hover:text-gray-900 rounded-full transition-colors shadow-sm border border-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            {editingId ? "Edit Potensi & UMKM" : "Tambah Potensi Desa & UMKM"}
          </h1>
          <p className="text-sm text-gray-500">
            {editingId ? "Perbarui informasi potensi unggulan atau usaha warga." : "Isi kelengkapan data informasi potensi unggulan atau usaha warga."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-primary" />
              Foto Sampul
            </h3>
            
            <ImageUpload 
              value={imagePreview || ""}
              onChange={(url) => setImagePreview(url)}
              label=""
            />
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Foto ini akan ditampilkan sebagai _thumbnail_ di halaman publik direktori desa.
            </p>
          </div>
        </div>

        {/* Right Column: Form Data */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                {activeTab === "umkm" ? <Store className="w-6 h-6" /> : <Map className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Informasi {activeTab === "umkm" ? "UMKM" : "Potensi Desa"}</h2>
                <p className="text-sm text-gray-500">Lengkapi data agar mudah ditemukan oleh calon pengunjung atau pembeli.</p>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setActiveTab("umkm")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === "umkm" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                UMKM Warga
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("potensi")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === "potensi" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Potensi Desa
              </button>
            </div>

            <form className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {activeTab === "umkm" ? "Nama Usaha / Produk" : "Nama Tempat / Potensi"}
                </label>
                <input 
                  type="text" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder={activeTab === "umkm" ? "Contoh: Kerajinan Rotan Ibu Ani" : "Contoh: Wisata Air Terjun Curug"}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                  <select 
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors"
                  >
                    {activeTab === "umkm" ? (
                      <>
                        <option>UMKM / Perdagangan</option>
                        <option>Kuliner / Makanan</option>
                        <option>Kerajinan Tangan</option>
                        <option>Jasa</option>
                      </>
                    ) : (
                      <>
                        <option>Wisata Alam</option>
                        <option>Wisata Buatan</option>
                        <option>Wisata Budaya</option>
                        <option>Pertanian & Perkebunan</option>
                        <option>Perikanan</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status Operasional</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors">
                    <option>Aktif</option>
                    <option>Dalam Pengembangan</option>
                    <option>Tutup Sementara</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {activeTab === "umkm" ? "Nama Pemilik" : "Nama Pengelola (BUMDes/Pokdarwis)"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={pemilik}
                      onChange={(e) => setPemilik(e.target.value)}
                      placeholder={activeTab === "umkm" ? "Nama pemilik usaha..." : "Nama instansi pengelola..."}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {activeTab === "umkm" ? "Rentang Harga (Rp)" : "Harga Tiket Masuk (Rp)"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                    <input 
                      type="text" 
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                      placeholder={activeTab === "umkm" ? "Contoh: 15.000 - 50.000" : "Contoh: 5.000"}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kontak (No. HP / WA)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={kontak}
                      onChange={(e) => setKontak(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Alamat / Lokasi Lengkap</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                  <textarea 
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    rows={2}
                    placeholder="Contoh: Jl. Pahlawan Dusun 2, RT 04/RW 02..."
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors resize-y"
                  />
                </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi / Penjelasan Singkat</label>
                <textarea 
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={4}
                  placeholder="Ceritakan keunikan produk wisata atau UMKM ini..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors resize-y"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end space-x-3">
                <Link 
                  href="/admin/potensi"
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </Link>
                <button 
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center shadow-md shadow-primary/20"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingId ? "Simpan Perubahan" : "Simpan Potensi & UMKM"}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TambahPotensiPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CreatePotensiForm />
    </Suspense>
  );
}
