"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Save, MapPin, Clock, Plus, Trash2, Edit2,
  CheckCircle2, X, RefreshCw, Check, Globe,
  Image as ImageIcon, Home, Settings
} from "lucide-react";
import { getProjects, saveProject, deleteProjectAction } from "@/actions/pembangunan";
import { getSiteSettings, saveSiteSettings } from "@/actions/profil";
import Link from "next/link";

const TABS = [
  { id: "hero", label: "Hero & Identitas", icon: Globe },
  { id: "pembangunan", label: "Proyek Pembangunan", icon: MapPin },
];

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const DEFAULT_PROJECT = {
  id: null, name: "", location: "", budget: 0,
  fundingSource: "Dana Desa", year: new Date().getFullYear(), progress: 0, status: "Berjalan"
};

export default function AdminBerandaPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "pembangunan">("hero");
  const [isPending, startTransition] = useTransition();
  const [savedMsg, setSavedMsg] = useState(false);

  // Hero / site settings
  const [settings, setSettings] = useState<any>({
    siteName: '', heroTitle: '', heroSubtitle: '', heroBackground: '',
    kecamatan: '', kabupaten: '', provinsi: '', jamPelayanan: ''
  });

  // Pembangunan
  const [projects, setProjects] = useState<any[]>([]);
  const [editProject, setEditProject] = useState<any | null>(null);
  const [showProjForm, setShowProjForm] = useState(false);

  useEffect(() => {
    async function load() {
      const [sets, projs] = await Promise.all([getSiteSettings(), getProjects()]);
      if (sets) setSettings(sets);
      setProjects(projs as any[]);
    }
    load();
  }, []);

  const flashSaved = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleSaveHero = () => {
    startTransition(async () => {
      await saveSiteSettings({
        siteName: settings.siteName,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        heroBackground: settings.heroBackground,
        kecamatan: settings.kecamatan,
        kabupaten: settings.kabupaten,
        provinsi: settings.provinsi,
        jamPelayanan: settings.jamPelayanan,
      });
      flashSaved();
    });
  };

  const openProjectForm = (p?: any) => {
    setEditProject(p || { ...DEFAULT_PROJECT });
    setShowProjForm(true);
  };

  const handleSaveProject = async () => {
    if (!editProject) return;
    startTransition(async () => {
      await saveProject(editProject);
      const fresh = await getProjects();
      setProjects(fresh as any[]);
      setShowProjForm(false);
      flashSaved();
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Hapus proyek ini?")) return;
    startTransition(async () => {
      await deleteProjectAction(id);
      const fresh = await getProjects();
      setProjects(fresh as any[]);
    });
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20";
  const labelClass = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="p-5 md:p-8 max-w-screen-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Beranda & Tampilan</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola konten hero/banner dan proyek pembangunan desa.</p>
        </div>
        <Link href="/admin/profil" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors">
          <Settings className="w-4 h-4" /> Pengaturan Profil Lengkap
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===== TAB: HERO ===== */}
      {activeTab === "hero" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
          <div>
            <h2 className="font-bold text-slate-900 mb-1">Hero Section & Identitas Desa</h2>
            <p className="text-xs text-slate-400">
              Data ini tersimpan ke database dan akan langsung tampil di website publik.
              Untuk info lengkap seperti alamat dan email, kelola di{" "}
              <Link href="/admin/profil" className="text-primary hover:underline">Profil Desa → Info & Hero Website</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nama Desa</label>
              <input type="text" value={settings.siteName || ''} onChange={e => setSettings({ ...settings, siteName: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Judul Hero (Baris 1)</label>
              <input type="text" value={settings.heroTitle || ''} onChange={e => setSettings({ ...settings, heroTitle: e.target.value })} placeholder="Selamat Datang di" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Subtitel Hero</label>
              <textarea rows={2} value={settings.heroSubtitle || ''} onChange={e => setSettings({ ...settings, heroSubtitle: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>URL Foto Background Hero</label>
              <input type="text" value={settings.heroBackground || ''} onChange={e => setSettings({ ...settings, heroBackground: e.target.value })} placeholder="https://..." className={inputClass} />
              {settings.heroBackground && (
                <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                  <img src={settings.heroBackground} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-bold">Preview Background</div>
                </div>
              )}
            </div>
            <div>
              <label className={labelClass}>Kecamatan</label>
              <input type="text" value={settings.kecamatan || ''} onChange={e => setSettings({ ...settings, kecamatan: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kabupaten</label>
              <input type="text" value={settings.kabupaten || ''} onChange={e => setSettings({ ...settings, kabupaten: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Provinsi</label>
              <input type="text" value={settings.provinsi || ''} onChange={e => setSettings({ ...settings, provinsi: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jam Pelayanan (pisah dengan | )</label>
              <input type="text" value={settings.jamPelayanan || ''} onChange={e => setSettings({ ...settings, jamPelayanan: e.target.value })} placeholder="Senin–Kamis: 08.00–15.00|Jumat: 08.00–11.00" className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSaveHero} disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 shadow-sm disabled:opacity-60">
              {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : savedMsg ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {savedMsg ? 'Tersimpan!' : 'Simpan ke Database'}
            </button>
          </div>
        </div>
      )}

      {/* ===== TAB: PEMBANGUNAN ===== */}
      {activeTab === "pembangunan" && (
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Proyek Pembangunan ({projects.length})</h2>
            <button onClick={() => openProjectForm()} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 shadow-sm">
              <Plus className="w-4 h-4" /> Tambah Proyek
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    p.status === 'Selesai' ? 'bg-green-100 text-green-700' : p.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status === 'Selesai' && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                    {p.status}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{p.year}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.name}</h3>
                <div className="space-y-1 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{p.location}</div>
                  <div className="flex items-center gap-1.5"><span className="font-semibold">Rp</span>{formatRupiah(p.budget)}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Sumber: {p.fundingSource}</div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Progress</span><span>{p.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${p.progress >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openProjectForm(p)} className="flex-1 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDeleteProject(p.id)} className="py-1.5 px-3 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-2 py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
                Belum ada proyek pembangunan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== MODAL FORM PEMBANGUNAN ===== */}
      {showProjForm && editProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">{editProject.id ? 'Edit' : 'Tambah'} Proyek Pembangunan</h3>
              <button onClick={() => setShowProjForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelClass}>Nama Proyek</label>
                <input type="text" value={editProject.name} onChange={e => setEditProject({ ...editProject, name: e.target.value })} className={inputClass} />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Lokasi</label>
                <input type="text" value={editProject.location} onChange={e => setEditProject({ ...editProject, location: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Anggaran (Rp)</label>
                <input type="number" value={editProject.budget} onChange={e => setEditProject({ ...editProject, budget: Number(e.target.value) })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sumber Dana</label>
                <input type="text" value={editProject.fundingSource} onChange={e => setEditProject({ ...editProject, fundingSource: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tahun</label>
                <input type="number" value={editProject.year} onChange={e => setEditProject({ ...editProject, year: Number(e.target.value) })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={editProject.status} onChange={e => setEditProject({ ...editProject, status: e.target.value })} className={inputClass}>
                  <option>Perencanaan</option>
                  <option>Berjalan</option>
                  <option>Selesai</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Progress (%)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={100} value={editProject.progress} onChange={e => setEditProject({ ...editProject, progress: Number(e.target.value) })} className="flex-1" />
                  <span className="font-bold text-slate-900 w-10 text-right">{editProject.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${editProject.progress}%` }} />
                </div>
              </div>
              <div className="col-span-2">
                <label className={labelClass}>URL Foto Proyek (Opsional)</label>
                <input type="text" value={editProject.image || ''} onChange={e => setEditProject({ ...editProject, image: e.target.value })} placeholder="https://..." className={inputClass} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowProjForm(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">Batal</button>
              <button onClick={handleSaveProject} disabled={isPending} className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-60 shadow-sm">
                {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
