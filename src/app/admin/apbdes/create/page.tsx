"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { saveApbdes, getApbdesList } from "@/actions/apbdes";

function CreateApbdesForm() {
  const [kategori, setKategori] = useState("Pendapatan");
  const [uraian, setUraian] = useState("");
  const [anggaran, setAnggaran] = useState("");
  const [realisasi, setRealisasi] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams?.get("id");
    if (id) {
      setEditingId(id);
      const fetchData = async () => {
        const list = await getApbdesList();
        // Search inside categories of each APBDes year
        let found: any = null;
        for (const apb of list) {
          const cat = (apb as any).categories?.find((c: any) => c.id === id);
          if (cat) { found = cat; break; }
        }
        if (found) {
          setKategori(found.type === 'PENDAPATAN' ? 'Pendapatan' : found.type === 'BELANJA' ? 'Belanja' : 'Pembiayaan');
          setUraian(found.name);
          setAnggaran(found.amount.toString());
          setRealisasi(found.realisasi?.toString() || '0');
        }
      };
      fetchData();
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveApbdes({
      id: editingId,
      kategori,
      uraian,
      anggaran,
      realisasi
    });
    alert("Data APBDes berhasil disimpan!");
    router.push("/admin/apbdes");
    router.refresh();
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/apbdes" className="p-2 bg-white text-gray-500 hover:text-gray-900 rounded-full transition-colors shadow-sm border border-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            {editingId ? "Edit Anggaran" : "Tambah Anggaran"}
          </h1>
          <p className="text-sm text-gray-500">Lengkapi form entri APBDes.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
              <select 
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Pendapatan</option>
                <option>Belanja</option>
                <option>Pembiayaan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Uraian / Nama Kegiatan</label>
              <input 
                type="text" 
                required
                value={uraian}
                onChange={(e) => setUraian(e.target.value)}
                placeholder="Contoh: Dana Desa (DD)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Anggaran (Rp)</label>
              <input 
                type="number" 
                required
                value={anggaran}
                onChange={(e) => setAnggaran(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Realisasi (Rp)</label>
              <input 
                type="number" 
                required
                value={realisasi}
                onChange={(e) => setRealisasi(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end space-x-3">
            <Link 
              href="/admin/apbdes"
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </Link>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center shadow-md shadow-primary/20"
            >
              <Save className="w-5 h-5 mr-2" />
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TambahApbdesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CreateApbdesForm />
    </Suspense>
  );
}
