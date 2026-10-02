"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, LayoutGrid } from "lucide-react";
import { getVillageService, saveVillageService } from "@/actions/layanan";

const ICON_OPTIONS = [
  "FileSignature", "MessageSquareWarning", "ShieldCheck", "HeartHandshake",
  "PieChart", "Users", "Download", "PhoneCall", "LayoutGrid", "Building2",
  "BookOpen", "Map", "Phone", "Mail", "Star",
];

const COLOR_OPTIONS = [
  { label: "Biru", value: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Kuning", value: "bg-amber-50 text-amber-600 border-amber-100" },
  { label: "Hijau", value: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { label: "Merah Muda", value: "bg-rose-50 text-rose-600 border-rose-100" },
  { label: "Ungu", value: "bg-purple-50 text-purple-600 border-purple-100" },
  { label: "Indigo", value: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { label: "Cyan", value: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { label: "Merah", value: "bg-red-50 text-red-600 border-red-100" },
  { label: "Toska", value: "bg-teal-50 text-teal-600 border-teal-100" },
  { label: "Orange", value: "bg-orange-50 text-orange-600 border-orange-100" },
];

function CreateLayananForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [href, setHref] = useState("/layanan/");
  const [icon, setIcon] = useState("LayoutGrid");
  const [color, setColor] = useState("bg-blue-50 text-blue-600 border-blue-100");
  const [order, setOrder] = useState("0");
  const [isVisible, setIsVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams?.get("id");

  useEffect(() => {
    if (editingId) {
      const fetch = async () => {
        const item = await getVillageService(editingId);
        if (item) {
          setTitle(item.title);
          setDescription(item.description);
          setHref(item.href);
          setIcon(item.icon);
          setColor(item.color);
          setOrder(item.order.toString());
          setIsVisible(item.isVisible);
        }
      };
      fetch();
    }
  }, [editingId]);

  const handleSave = async () => {
    if (!title || !href) { alert("Nama dan Link wajib diisi."); return; }
    setIsSaving(true);
    try {
      await saveVillageService({ id: editingId, title, description, href, icon, color, isVisible, order: Number(order) });
      alert("Layanan berhasil disimpan!");
      router.push("/admin/layanan");
      router.refresh();
    } catch (e) {
      alert("Gagal menyimpan layanan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/layanan" className="p-2 bg-white text-gray-500 hover:text-gray-900 rounded-full shadow-sm border border-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">{editingId ? "Edit Layanan" : "Tambah Layanan"}</h1>
          <p className="text-sm text-gray-500">Layanan akan tampil di Beranda dan Portal Layanan publik.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nama Layanan *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Surat Keterangan" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Singkat</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Jelaskan singkat manfaat layanan ini..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Link Tujuan *</label>
          <input type="text" value={href} onChange={(e) => setHref(e.target.value)} placeholder="/layanan/administrasi" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors font-mono text-sm" />
          <p className="text-xs text-gray-400 mt-1">Gunakan path relatif, contoh: /layanan/pengaduan</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Icon</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50 focus:bg-white transition-colors">
              {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Warna</label>
            <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50 focus:bg-white transition-colors">
              {COLOR_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Urutan Tampil</label>
            <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} min={0} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <div className="flex items-center space-x-3 mt-3">
              <button type="button" onClick={() => setIsVisible(!isVisible)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isVisible ? "bg-primary" : "bg-gray-200"}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${isVisible ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              <span className="text-sm text-gray-600">{isVisible ? "Aktif (tampil publik)" : "Nonaktif (tersembunyi)"}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <Link href="/admin/layanan" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">Batal</Link>
          <button type="button" onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center shadow-sm shadow-primary/20 disabled:opacity-50">
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Menyimpan..." : "Simpan Layanan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TambahLayananPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CreateLayananForm />
    </Suspense>
  );
}
