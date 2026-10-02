"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Plus, Search, Edit2, Trash2, Wallet, RefreshCw,
  TrendingUp, TrendingDown, PiggyBank, CheckCircle2,
  ChevronDown, Save, X, Check
} from "lucide-react";
import Link from "next/link";
import { getApbdesList, saveApbdesCategory, deleteApbdesCategory } from "@/actions/apbdes";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n || 0);

const TYPE_COLORS: Record<string, string> = {
  PENDAPATAN: "bg-green-100 text-green-800 border-green-200",
  BELANJA: "bg-red-100 text-red-800 border-red-200",
  PEMBIAYAAN: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function AdminApbdesPage() {
  const [apbData, setApbData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("SEMUA");
  const [isPending, startTransition] = useTransition();

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    type: "PENDAPATAN",
    name: "",
    amount: 0,
    realisasi: 0,
  });
  const [saved, setSaved] = useState(false);

  const loadData = async () => {
    const list = await getApbdesList();
    setApbData(list as any[]);
    if (list.length > 0) setSelectedYear((list[0] as any).year);
  };

  useEffect(() => { loadData(); }, []);

  const currentData = apbData.find(d => d.year === selectedYear);
  const categories = currentData?.categories || [];
  const filtered = categories.filter((c: any) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "SEMUA" || c.type === filterType;
    return matchSearch && matchType;
  });

  const totalByType = (type: string) => categories.filter((c: any) => c.type === type).reduce((s: number, c: any) => s + c.amount, 0);
  const realizationByType = (type: string) => categories.filter((c: any) => c.type === type).reduce((s: number, c: any) => s + c.realisasi, 0);

  const openCreate = () => {
    setEditItem(null);
    setForm({ year: selectedYear, type: "PENDAPATAN", name: "", amount: 0, realisasi: 0 });
    setShowForm(true);
    setSaved(false);
  };
  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({ year: selectedYear, type: item.type, name: item.name, amount: item.amount, realisasi: item.realisasi });
    setShowForm(true);
    setSaved(false);
  };

  const handleSave = async () => {
    startTransition(async () => {
      await saveApbdesCategory({ id: editItem?.id, ...form });
      setSaved(true);
      await loadData();
      setTimeout(() => { setShowForm(false); setSaved(false); }, 800);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data anggaran ini?")) return;
    startTransition(async () => {
      await deleteApbdesCategory(id);
      await loadData();
    });
  };

  return (
    <div className="p-5 md:p-8 max-w-screen-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Keuangan APBDes</h1>
          <p className="text-sm text-slate-500 mt-1">Anggaran Pendapatan dan Belanja Desa — Transparansi Keuangan Publik</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Entri
        </button>
      </div>

      {/* Year Selector */}
      {apbData.length > 0 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 shrink-0">Pilih Tahun:</span>
          <div className="flex gap-1.5">
            {apbData.map((d: any) => (
              <button
                key={d.year}
                onClick={() => setSelectedYear(d.year)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  selectedYear === d.year ? "bg-primary text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {d.year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { type: "PENDAPATAN", label: "Total Pendapatan", icon: TrendingUp, bg: "bg-green-50", border: "border-green-100", text: "text-green-700", boldText: "text-green-900" },
          { type: "BELANJA", label: "Total Belanja", icon: TrendingDown, bg: "bg-red-50", border: "border-red-100", text: "text-red-700", boldText: "text-red-900" },
          { type: "PEMBIAYAAN", label: "Pembiayaan", icon: PiggyBank, bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", boldText: "text-blue-900" },
        ].map((c) => {
          const total = totalByType(c.type);
          const real = realizationByType(c.type);
          const pct = total > 0 ? Math.min(Math.round((real / total) * 100), 100) : 0;
          return (
            <div key={c.type} className={`${c.bg} ${c.border} border rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <c.icon className={`w-5 h-5 ${c.text}`} />
                <span className={`text-xs font-bold ${c.text} uppercase tracking-wide`}>{c.label}</span>
              </div>
              <div className={`text-xl font-bold ${c.boldText} mb-2`}>{formatRupiah(total)}</div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className={c.text}>Realisasi: {formatRupiah(real)}</span>
                <span className="font-bold">{pct}%</span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${c.type === 'PENDAPATAN' ? 'bg-green-500' : c.type === 'BELANJA' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari uraian anggaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {["SEMUA", "PENDAPATAN", "BELANJA", "PEMBIAYAAN"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === t ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t === 'SEMUA' ? 'Semua' : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5 text-left">Uraian</th>
              <th className="px-5 py-3.5 text-left">Jenis</th>
              <th className="px-5 py-3.5 text-right">Anggaran</th>
              <th className="px-5 py-3.5 text-right">Realisasi</th>
              <th className="px-5 py-3.5 text-right">Progress</th>
              <th className="px-5 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((item: any) => {
              const pct = item.amount > 0 ? Math.min(Math.round((item.realisasi / item.amount) * 100), 100) : 0;
              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-900">{item.name}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${TYPE_COLORS[item.type]}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-slate-700 whitespace-nowrap">{formatRupiah(item.amount)}</td>
                  <td className="px-5 py-3.5 text-right text-slate-600 whitespace-nowrap">{formatRupiah(item.realisasi)}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                        <div
                          className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  {currentData ? "Tidak ada data yang cocok" : "Pilih tahun atau tambah data anggaran"}
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
              <h3 className="font-bold text-lg text-slate-900">{editItem ? 'Edit' : 'Tambah'} Entri Anggaran</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Tahun Anggaran</label>
                <input type="number" value={form.year} onChange={e => setForm({ ...form, year: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Jenis Anggaran</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                  <option value="PENDAPATAN">Pendapatan</option>
                  <option value="BELANJA">Belanja</option>
                  <option value="PEMBIAYAAN">Pembiayaan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Uraian</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama kategori anggaran" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Pagu Anggaran (Rp)</label>
                  <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Realisasi (Rp)</label>
                  <input type="number" value={form.realisasi} onChange={e => setForm({ ...form, realisasi: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              {form.amount > 0 && (
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
                  Progress: <strong>{Math.round((form.realisasi / form.amount) * 100)}%</strong> • Sisa: {formatRupiah(form.amount - form.realisasi)}
                </div>
              )}
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
