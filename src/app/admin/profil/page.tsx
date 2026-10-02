"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Save, Check, Landmark, Users, BookOpen, Plus, Trash2,
  Globe, Phone, Mail, Clock, MapPin, Image as ImageIcon,
  ChevronDown, RefreshCw, Building2, Shield, Eye
} from "lucide-react";
import {
  getSiteSettings, saveSiteSettings,
  getVillageProfile, saveVillageProfile,
  getVillageOfficials, saveVillageOfficial, deleteVillageOfficial
} from "@/actions/profil";
import ImageUpload from "@/components/ui/ImageUpload";

const TABS = [
  { id: "siteinfo", label: "Info & Hero Website", icon: Globe },
  { id: "profil", label: "Profil Wilayah", icon: Landmark },
  { id: "visi", label: "Visi & Misi", icon: Shield },
  { id: "sejarah", label: "Sejarah & Timeline", icon: BookOpen },
  { id: "perangkat", label: "Perangkat Desa", icon: Users },
];

export default function ProfilAdminPage() {
  const [activeTab, setActiveTab] = useState("siteinfo");
  const [isPending, startTransition] = useTransition();
  const [savedTab, setSavedTab] = useState<string | null>(null);

  // ===== STATE =====
  const [siteSettings, setSiteSettings] = useState<any>({
    siteName: '', tagline: '', address: '', email: '', phone: '',
    postalCode: '', officeHours: '', heroTitle: '', heroSubtitle: '',
    heroBackground: '', kecamatan: '', kabupaten: '', provinsi: '', jamPelayanan: ''
  });
  const [villageProfile, setVillageProfile] = useState<any>({
    profilSingkat: '', luasWilayah: '', sejarah: '', sejarahImage: '', visi: '', misi: '', timeline: '[]', bpdInfo: ''
  });
  const [timelineItems, setTimelineItems] = useState<{ year: string; title: string; desc: string }[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);
  const [bpdMembers, setBpdMembers] = useState<any[]>([]);
  const [editingOfficial, setEditingOfficial] = useState<any | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    const [settings, profile, offs, bpds] = await Promise.all([
      getSiteSettings(),
      getVillageProfile(),
      getVillageOfficials("PEMDES"),
      getVillageOfficials("BPD"),
    ]);
    if (settings) setSiteSettings(settings);
    if (profile) {
      setVillageProfile(profile);
      try { setTimelineItems(JSON.parse(profile.timeline || '[]')); } catch { setTimelineItems([]); }
    }
    setOfficials(offs);
    setBpdMembers(bpds);
  }

  const flashSaved = (tab: string) => {
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 2500);
  };

  // ===== HANDLERS =====
  const handleSaveSiteSettings = () => {
    startTransition(async () => {
      await saveSiteSettings(siteSettings);
      flashSaved('siteinfo');
    });
  };

  const handleSaveProfile = () => {
    startTransition(async () => {
      await saveVillageProfile({
        ...villageProfile,
        timeline: JSON.stringify(timelineItems),
      });
      flashSaved(activeTab);
    });
  };

  const handleSaveOfficial = async () => {
    if (!editingOfficial) return;
    startTransition(async () => {
      await saveVillageOfficial({
        id: editingOfficial.id || undefined,
        name: editingOfficial.name,
        position: editingOfficial.position,
        description: editingOfficial.description,
        image: editingOfficial.image,
        order: editingOfficial.order || (editingOfficial.type === 'BPD' ? bpdMembers.length + 1 : officials.length + 1),
        type: editingOfficial.type || "PEMDES",
      });
      const freshOffs = await getVillageOfficials("PEMDES");
      setOfficials(freshOffs);
      setEditingOfficial(null);
      flashSaved('perangkat');
    });
  };

  const handleDeleteOfficial = (id: string) => {
    if (!confirm("Hapus perangkat desa ini?")) return;
    startTransition(async () => {
      await deleteVillageOfficial(id);
      const freshOffs = await getVillageOfficials("PEMDES");
      setOfficials(freshOffs);
    });
  };


  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20";
  const labelClass = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="p-5 md:p-8 max-w-screen-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Profil Desa</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola informasi profil, perangkat, dan data statistik desa.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              const saved = savedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all text-left w-full ${
                    active ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {saved ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Icon className="w-4 h-4 shrink-0" />}
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">

          {/* ===== TAB: INFO & HERO WEBSITE ===== */}
          {activeTab === "siteinfo" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-1">Informasi Umum Website</h2>
                <p className="text-xs text-slate-400">Data ini ditampilkan di footer, meta title, dan berbagai bagian website publik.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "siteName", label: "Nama Desa", placeholder: "Desa Contoh" },
                  { key: "tagline", label: "Tagline / Sub-nama", placeholder: "Pemerintah Kabupaten ..." },
                  { key: "kecamatan", label: "Kecamatan", placeholder: "Kecamatan ..." },
                  { key: "kabupaten", label: "Kabupaten", placeholder: "Kab. ..." },
                  { key: "provinsi", label: "Provinsi", placeholder: "Provinsi ..." },
                  { key: "postalCode", label: "Kode Pos", placeholder: "12345" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className={labelClass}>{f.label}</label>
                    <input type="text" value={siteSettings[f.key] || ''} onChange={e => setSiteSettings({ ...siteSettings, [f.key]: e.target.value })} placeholder={f.placeholder} className={inputClass} />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className={labelClass}>Alamat Kantor</label>
                  <input type="text" value={siteSettings.address || ''} onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Resmi</label>
                  <input type="email" value={siteSettings.email || ''} onChange={e => setSiteSettings({ ...siteSettings, email: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Telepon Kantor</label>
                  <input type="text" value={siteSettings.phone || ''} onChange={e => setSiteSettings({ ...siteSettings, phone: e.target.value })} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Jam Operasional (pisahkan baris dengan |)</label>
                  <input type="text" value={siteSettings.officeHours || ''} onChange={e => setSiteSettings({ ...siteSettings, officeHours: e.target.value })} placeholder="Senin–Kamis: 08.00–15.00" className={inputClass} />
                </div>
              </div>

              <hr className="border-slate-100" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-4">Konten Hero / Banner Utama</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Judul Baris Pertama (mis: "Selamat Datang di")</label>
                    <input type="text" value={siteSettings.heroTitle || ''} onChange={e => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Subtitel / Deskripsi Singkat</label>
                    <textarea rows={2} value={siteSettings.heroSubtitle || ''} onChange={e => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Foto Background Hero</label>
                    <ImageUpload 
                      value={siteSettings.heroBackground || ''} 
                      onChange={(url) => setSiteSettings({ ...siteSettings, heroBackground: url })} 
                      label=""
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Jam Pelayanan (untuk info card di hero, format: "Senin – Kamis: 08.00 – 15.00|Jumat: 08.00 – 11.00")</label>
                    <input type="text" value={siteSettings.jamPelayanan || ''} onChange={e => setSiteSettings({ ...siteSettings, jamPelayanan: e.target.value })} className={inputClass} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleSaveSiteSettings} disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60">
                  {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : savedTab === 'siteinfo' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savedTab === 'siteinfo' ? 'Tersimpan!' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          )}

          {/* ===== TAB: PROFIL WILAYAH ===== */}
          {activeTab === "profil" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900">Profil Wilayah</h2>
              <div>
                <label className={labelClass}>Deskripsi Singkat Desa</label>
                <textarea rows={4} value={villageProfile.profilSingkat || ''} onChange={e => setVillageProfile({ ...villageProfile, profilSingkat: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Luas Wilayah</label>
                  <input type="text" value={villageProfile.luasWilayah || ''} onChange={e => setVillageProfile({ ...villageProfile, luasWilayah: e.target.value })} placeholder="cth: 12.45 km²" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Jumlah Dusun</label>
                  <input type="text" value={villageProfile.jumlahDusun || ''} onChange={e => setVillageProfile({ ...villageProfile, jumlahDusun: e.target.value })} placeholder="cth: 4" className={inputClass} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-4">Pengaturan Peta Desa (Google Maps)</h3>
                <div className="bg-blue-50/50 border border-blue-100 text-blue-700 text-sm p-4 rounded-xl mb-4">
                  <p className="font-semibold mb-1">Cara mendapatkan koordinat:</p>
                  <ol className="list-decimal pl-4 space-y-1 opacity-90">
                    <li>Buka <a href="https://maps.google.com" target="_blank" className="underline font-medium hover:text-blue-800">Google Maps</a>, cari lokasi kantor desa.</li>
                    <li>Klik kanan pada titik lokasi (pin merah), lalu klik angka koordinat (cth: -7.4478, 112.7183) untuk otomatis menyalin.</li>
                    <li>Paste angka pertama di kolom Latitude, dan angka kedua di kolom Longitude.</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Latitude (Garis Lintang)</label>
                    <input type="text" value={villageProfile.koordinatLat || ''} onChange={e => setVillageProfile({ ...villageProfile, koordinatLat: e.target.value })} placeholder="cth: -7.4478" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Longitude (Garis Bujur)</label>
                    <input type="text" value={villageProfile.koordinatLng || ''} onChange={e => setVillageProfile({ ...villageProfile, koordinatLng: e.target.value })} placeholder="cth: 112.7183" className={inputClass} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSaveProfile} disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60">
                  {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : savedTab === 'profil' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savedTab === 'profil' ? 'Tersimpan!' : 'Simpan'}
                </button>
              </div>
            </div>
          )}

          {/* ===== TAB: VISI & MISI ===== */}
          {activeTab === "visi" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900">Visi & Misi Desa</h2>
              <div>
                <label className={labelClass}>Visi</label>
                <textarea rows={3} value={villageProfile.visi || ''} onChange={e => setVillageProfile({ ...villageProfile, visi: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Misi (Tulis setiap poin di baris baru)</label>
                <textarea rows={6} value={villageProfile.misi || ''} onChange={e => setVillageProfile({ ...villageProfile, misi: e.target.value })} className={inputClass} />
              </div>
              <div className="flex justify-end">
                <button onClick={handleSaveProfile} disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60">
                  {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : savedTab === 'visi' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savedTab === 'visi' ? 'Tersimpan!' : 'Simpan Visi & Misi'}
                </button>
              </div>
            </div>
          )}

          {/* ===== TAB: SEJARAH ===== */}
          {activeTab === "sejarah" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-bold text-slate-900">Sejarah & Timeline Desa</h2>
              <div>
                <label className={labelClass}>Narasi Sejarah</label>
                <textarea rows={6} value={villageProfile.sejarah || ''} onChange={e => setVillageProfile({ ...villageProfile, sejarah: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Foto Ilustrasi Sejarah</label>
                <ImageUpload 
                  value={villageProfile.sejarahImage || ''} 
                  onChange={(url) => setVillageProfile({ ...villageProfile, sejarahImage: url })} 
                  label=""
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`${labelClass} mb-0`}>Timeline Tonggak Sejarah</label>
                  <button onClick={() => setTimelineItems([...timelineItems, { year: '', title: '', desc: '' }])} className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80">
                    <Plus className="w-3.5 h-3.5" /> Tambah Tonggak
                  </button>
                </div>
                <div className="space-y-3">
                  {timelineItems.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4 relative">
                      <button onClick={() => setTimelineItems(timelineItems.filter((_, i) => i !== idx))} className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tahun / Periode</label>
                          <input type="text" value={item.year} onChange={e => { const t = [...timelineItems]; t[idx].year = e.target.value; setTimelineItems(t); }} className={`${inputClass} mt-1`} placeholder="cth: Tahun 1982" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Judul</label>
                          <input type="text" value={item.title} onChange={e => { const t = [...timelineItems]; t[idx].title = e.target.value; setTimelineItems(t); }} className={`${inputClass} mt-1`} />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi</label>
                        <textarea rows={2} value={item.desc} onChange={e => { const t = [...timelineItems]; t[idx].desc = e.target.value; setTimelineItems(t); }} className={`${inputClass} mt-1`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSaveProfile} disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60">
                  {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : savedTab === 'sejarah' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {savedTab === 'sejarah' ? 'Tersimpan!' : 'Simpan Sejarah'}
                </button>
              </div>
            </div>
          )}

          {/* ===== TAB: PERANGKAT DESA ===== */}
          {activeTab === "perangkat" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Perangkat Desa ({officials.length})</h2>
                <button
                  onClick={() => setEditingOfficial({ name: '', position: '', description: '', image: '', order: officials.length + 1 })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Tambah Perangkat
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {officials.map((off) => (
                  <div key={off.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="relative h-36 bg-slate-100">
                      {off.image ? (
                        <img src={off.image} alt={off.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Users className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-slate-900 text-sm truncate">{off.name}</div>
                      <div className="text-xs text-primary font-medium mb-3">{off.position}</div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingOfficial(off)} className="flex-1 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteOfficial(off.id)} className="py-1.5 px-3 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Modal */}
              {editingOfficial && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                    <h3 className="font-bold text-lg mb-5">{editingOfficial.id ? 'Edit' : 'Tambah'} Perangkat Desa</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>Nama Lengkap</label>
                        <input type="text" value={editingOfficial.name} onChange={e => setEditingOfficial({ ...editingOfficial, name: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Jabatan</label>
                        <input type="text" value={editingOfficial.position} onChange={e => setEditingOfficial({ ...editingOfficial, position: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Sambutan / Deskripsi</label>
                        <textarea rows={4} value={editingOfficial.description || ''} onChange={e => setEditingOfficial({ ...editingOfficial, description: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Foto</label>
                        <ImageUpload 
                          value={editingOfficial.image || ''} 
                          onChange={(url) => setEditingOfficial({ ...editingOfficial, image: url })} 
                          label=""
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Urutan Tampil</label>
                        <input type="number" value={editingOfficial.order || 0} onChange={e => setEditingOfficial({ ...editingOfficial, order: Number(e.target.value) })} className={inputClass} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button onClick={() => setEditingOfficial(null)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200">Batal</button>
                      <button onClick={handleSaveOfficial} disabled={isPending} className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
                        {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
