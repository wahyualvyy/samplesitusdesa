"use client";

import { useState, useEffect, useTransition } from "react";
import {
  FolderOpen, Plus, Trash2, Edit2, Download, Search, X, Save, RefreshCw, Check, FileText
} from "lucide-react";
import { getDocumentList, saveDocument, deleteDocument, getPPIDDocumentList, savePPIDDocument, deletePPIDDocument } from "@/actions/dokumen";

const TABS = [
  { id: "dokumen", label: "Dokumen Desa" },
  { id: "ppid", label: "PPID / Informasi Publik" },
];

const DOC_CATEGORIES = ["Peraturan Desa", "SK Kades", "Laporan", "Berita Acara", "Lainnya"];
const PPID_CATEGORIES = ["Berkala", "Serta Merta", "Setiap Saat"];

const DEFAULT_DOC = { id: null, title: "", year: new Date().getFullYear(), category: "Peraturan Desa", fileUrl: "", fileSize: "" };
const DEFAULT_PPID = { id: null, title: "", year: new Date().getFullYear(), category: "Berkala", fileUrl: "", fileSize: "" };

export default function AdminDokumenPage() {
  const [activeTab, setActiveTab] = useState<"dokumen" | "ppid">("dokumen");
  const [docs, setDocs] = useState<any[]>([]);
  const [ppids, setPpids] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(DEFAULT_DOC);
  const [saved, setSaved] = useState(false);

  const loadData = async () => {
    const [d, p] = await Promise.all([getDocumentList(), getPPIDDocumentList()]);
    setDocs(d as any[]);
    setPpids(p as any[]);
  };
  useEffect(() => { loadData(); }, []);

  const openForm = (item?: any) => {
    if (activeTab === "dokumen") setForm(item ? { ...item } : { ...DEFAULT_DOC });
    else setForm(item ? { ...item } : { ...DEFAULT_PPID });
    setShowForm(true);
    setSaved(false);
  };

  const handleSave = async () => {
    startTransition(async () => {
      if (activeTab === "dokumen") {
        await saveDocument({ id: form.id || undefined, title: form.title, year: Number(form.year), category: form.category, fileUrl: form.fileUrl, fileSize: form.fileSize });
      } else {
        await savePPIDDocument({ id: form.id || undefined, title: form.title, year: Number(form.year), category: form.category, fileUrl: form.fileUrl, fileSize: form.fileSize });
      }
      setSaved(true);
      await loadData();
      setTimeout(() => { setShowForm(false); setSaved(false); }, 800);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus dokumen ini?")) return;
    startTransition(async () => {
      if (activeTab === "dokumen") await deleteDocument(id);
      else await deletePPIDDocument(id);
      await loadData();
    });
  };

  const items = activeTab === "dokumen" ? docs : ppids;
  const filtered = items.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20";
  const labelClass = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="p-5 md:p-8 max-w-screen-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Dokumen Publik</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dokumen regulasi desa dan informasi PPID untuk transparansi publik.</p>
        </div>
        <button onClick={() => openForm()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 shadow-sm">
          <Plus className="w-4 h-4" /> Unggah Dokumen
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setSearchTerm(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari dokumen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5 text-left">Judul Dokumen</th>
              <th className="px-5 py-3.5 text-left hidden sm:table-cell">Kategori</th>
              <th className="px-5 py-3.5 text-center hidden md:table-cell">Tahun</th>
              <th className="px-5 py-3.5 text-center hidden lg:table-cell">Ukuran</th>
              {activeTab === "dokumen" && <th className="px-5 py-3.5 text-center hidden lg:table-cell">Download</th>}
              <th className="px-5 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-400 sm:hidden">{item.category} • {item.year}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-medium">{item.category}</span>
                </td>
                <td className="px-5 py-3.5 text-center hidden md:table-cell text-slate-600">{item.year}</td>
                <td className="px-5 py-3.5 text-center hidden lg:table-cell text-slate-500">{item.fileSize}</td>
                {activeTab === "dokumen" && (
                  <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                    <span className="flex items-center justify-center gap-1 text-emerald-600">
                      <Download className="w-3.5 h-3.5" />
                      <span>{(item as any).downloads || 0}</span>
                    </span>
                  </td>
                )}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => openForm(item)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                  Belum ada dokumen. <button onClick={() => openForm()} className="text-primary font-medium hover:underline">Tambah sekarang.</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== FORM MODAL ===== */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-slate-900">{form.id ? 'Edit' : 'Tambah'} Dokumen</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Judul Dokumen</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Kategori</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                    {(activeTab === 'dokumen' ? DOC_CATEGORIES : PPID_CATEGORIES).map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tahun</label>
                  <input type="number" value={form.year} onChange={e => setForm({ ...form, year: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>URL / Path File</label>
                <input type="text" value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} placeholder="/dokumen/nama-file.pdf" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Ukuran File (mis: 2.1 MB)</label>
                <input type="text" value={form.fileSize} onChange={e => setForm({ ...form, fileSize: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">Batal</button>
              <button onClick={handleSave} disabled={isPending} className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-60 shadow-sm">
                {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Tersimpan!' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
