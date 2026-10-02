"use client";

import { useState, useEffect, useTransition } from "react";
import {
  MessageSquareWarning, Search, Filter, CheckCircle2, Clock,
  AlertCircle, XCircle, Send, RefreshCw, Plus, ChevronDown,
  ArrowLeft, User, Tag, MapPin, Phone, Mail, Calendar
} from "lucide-react";
import { getComplaintList, updateComplaintStatus, getComplaintStats } from "@/actions/aduan";

const STATUS_OPTIONS = ["SEMUA", "DITERIMA", "DIPROSES", "SELESAI", "DITOLAK"];

const STATUS_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  DITERIMA: {
    label: "Diterima",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  DIPROSES: {
    label: "Diproses",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Clock className="w-3 h-3" />,
  },
  SELESAI: {
    label: "Selesai",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  DITOLAK: {
    label: "Ditolak",
    color: "bg-slate-100 text-slate-600 border-slate-200",
    icon: <XCircle className="w-3 h-3" />,
  },
};

export default function AdminAduanPage() {
  const [aduan, setAduan] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, diterima: 0, diproses: 0, selesai: 0, ditolak: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  const [selected, setSelected] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyStatus, setReplyStatus] = useState("DIPROSES");
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(false);

  const loadData = async () => {
    const [list, st] = await Promise.all([
      getComplaintList(),
      getComplaintStats(),
    ]);
    setAduan(list as any[]);
    setStats(st);
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenModal = (item: any) => {
    setSelected(item);
    setReplyText(item.adminNote || "");
    setReplyStatus(item.status === 'DITERIMA' ? 'DIPROSES' : item.status);
    setIsSaved(false);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    startTransition(async () => {
      await updateComplaintStatus(selected.id, replyStatus, replyText);
      setIsSaved(true);
      await loadData();
      // Update selected to new status
      setSelected((prev: any) => prev ? { ...prev, status: replyStatus, adminNote: replyText } : null);
    });
  };

  const filtered = aduan.filter(a => {
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "SEMUA" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-5 md:p-8 max-w-screen-2xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Aduan Masyarakat</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dan tanggapi laporan, kritik, serta saran warga.</p>
        </div>
        <button
          onClick={() => startTransition(() => { loadData(); })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Aduan", value: stats.total, color: "bg-slate-50 border-slate-200", textColor: "text-slate-900" },
          { label: "Menunggu Tanggapan", value: stats.diterima, color: "bg-red-50 border-red-100", textColor: "text-red-700" },
          { label: "Sedang Diproses", value: stats.diproses, color: "bg-amber-50 border-amber-100", textColor: "text-amber-700" },
          { label: "Terselesaikan", value: stats.selesai, color: "bg-green-50 border-green-100", textColor: "text-green-700" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} border rounded-2xl p-4`}>
            <div className={`text-2xl font-bold ${s.textColor}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, judul, atau tracking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === s
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s === 'SEMUA' ? 'Semua' : STATUS_META[s]?.label}
              {s !== 'SEMUA' && (
                <span className="ml-1.5 opacity-70">
                  ({s === 'DITERIMA' ? stats.diterima : s === 'DIPROSES' ? stats.diproses : s === 'SELESAI' ? stats.selesai : stats.ditolak})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Aduan List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenModal(item)}
            className={`bg-white rounded-2xl border p-5 cursor-pointer hover:shadow-md transition-all group ${
              item.status === 'DITERIMA' ? 'border-red-200 hover:border-red-300' : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${STATUS_META[item.status]?.color}`}>
                    {STATUS_META[item.status]?.icon}
                    {STATUS_META[item.status]?.label}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.trackingId}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-1">{item.content}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />{item.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <button className="shrink-0 px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                {item.status === 'SELESAI' ? 'Lihat Detail' : 'Tanggapi'}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
            <MessageSquareWarning className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Tidak ada aduan ditemukan</p>
            <p className="text-sm text-slate-400 mt-1">Coba ubah filter pencarian</p>
          </div>
        )}
      </div>

      {/* ===== MODAL DETAIL & REPLY ===== */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-4 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${STATUS_META[selected.status]?.color}`}>
                    {STATUS_META[selected.status]?.icon}
                    {STATUS_META[selected.status]?.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{selected.trackingId}</span>
                </div>
                <h2 className="font-bold text-lg text-slate-900 leading-snug">{selected.title}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* Reporter Info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: User, label: "Nama", value: selected.name },
                  { icon: Tag, label: "Kategori", value: selected.category },
                  { icon: Phone, label: "Telepon", value: selected.phone },
                  { icon: Mail, label: "Email", value: selected.email || "-" },
                  { icon: MapPin, label: "Lokasi", value: selected.location || "-" },
                  { icon: Calendar, label: "Tanggal", value: new Date(selected.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-2 text-sm">
                    <row.icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">{row.label}</div>
                      <div className="font-medium text-slate-800 break-all">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Isi Aduan */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Isi Aduan</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">{selected.content}</div>
              </div>

              {/* Timeline */}
              {selected.timelines && selected.timelines.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-3">Riwayat Status</p>
                  <div className="relative pl-4 border-l-2 border-slate-100 space-y-3">
                    {selected.timelines.map((tl: any) => (
                      <div key={tl.id} className="relative">
                        <div className="absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ background: tl.status === 'SELESAI' ? '#22c55e' : tl.status === 'DIPROSES' ? '#f59e0b' : tl.status === 'DITOLAK' ? '#94a3b8' : '#ef4444' }}
                        />
                        <div className="bg-slate-50 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_META[tl.status]?.color}`}>
                              {STATUS_META[tl.status]?.label}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(tl.createdAt).toLocaleString('id-ID')}
                            </span>
                          </div>
                          {tl.notes && <p className="text-xs text-slate-600">{tl.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-700 uppercase">Update Status & Tanggapan</p>
                  <select
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value)}
                    className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="DIPROSES">Diproses</option>
                    <option value="SELESAI">Selesai</option>
                    <option value="DITOLAK">Ditolak</option>
                  </select>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tuliskan tanggapan atau catatan untuk aduan ini..."
                  className="w-full min-h-[100px] px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-slate-50/50 resize-none"
                />
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-200 transition-colors"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 bg-primary text-white font-medium rounded-xl text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSaved ? 'Tersimpan!' : 'Kirim Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
