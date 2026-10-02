"use client";

import { useState, useEffect } from "react";
import { Save, Eye, EyeOff, Layers, MessageSquare, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { getPageSection, upsertPageSection, toggleSectionVisibility } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";

type SectionData = {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  fields: { key: string; label: string; type: "text" | "textarea" | "url"; placeholder: string }[];
};

const SECTIONS: SectionData[] = [
  {
    key: "services-heading",
    label: "Section: Layanan Cepat (Heading)",
    description: "Judul dan subjudul pada section Layanan Cepat di beranda.",
    icon: LayoutGrid,
    fields: [
      { key: "title", label: "Judul Section", type: "text", placeholder: "Layanan Cepat" },
      { key: "subtitle", label: "Subjudul", type: "textarea", placeholder: "Akses berbagai layanan publik..." },
    ],
  },
  {
    key: "overview-heading",
    label: "Section: Profil Singkat (Heading)",
    description: "Teks badge, judul, dan keterangan lokasi pada section profil singkat.",
    icon: Layers,
    fields: [
      { key: "badge", label: "Badge Kecil", type: "text", placeholder: "Profil Singkat" },
      { key: "title", label: "Judul Pertama", type: "text", placeholder: "Mengenal Lebih Dekat" },
      { key: "highlight", label: "Judul Highlight (Hijau)", type: "text", placeholder: "Desa Simoketawang" },
      { key: "lokasi", label: "Keterangan Lokasi (di card)", type: "textarea", placeholder: "Terletak di Kec. Wonoayu..." },
    ],
  },
  {
    key: "welcome-heading",
    label: "Section: Sambutan Kepala Desa (Heading)",
    description: "Judul dan link tombol pada section sambutan kepala desa.",
    icon: MessageSquare,
    fields: [
      { key: "title", label: "Judul Section", type: "text", placeholder: "Sambutan Kepala Desa" },
      { key: "linkText", label: "Teks Tombol", type: "text", placeholder: "Lihat Profil Pemerintahan" },
      { key: "linkHref", label: "Link Tombol", type: "url", placeholder: "/profil/pemerintahan" },
    ],
  },
  {
    key: "gallery-heading",
    label: "Section: Galeri Desa (Heading)",
    description: "Judul, subjudul, dan teks link pada section Galeri.",
    icon: ImageIcon,
    fields: [
      { key: "title", label: "Judul Section", type: "text", placeholder: "Galeri Desa" },
      { key: "subtitle", label: "Subjudul", type: "textarea", placeholder: "Koleksi foto kegiatan..." },
      { key: "linkText", label: "Teks Link", type: "text", placeholder: "Lihat Semua Foto" },
    ],
  },
  {
    key: "cta",
    label: "Section: Call to Action (Banner Bawah)",
    description: "Teks, tombol, dan link pada banner ajakan di bagian paling bawah beranda.",
    icon: MessageSquare,
    fields: [
      { key: "title", label: "Judul Besar", type: "textarea", placeholder: "Punya Pertanyaan..." },
      { key: "subtitle", label: "Teks Bawah Judul", type: "textarea", placeholder: "Pemerintah Desa siap..." },
      { key: "button1Text", label: "Tombol 1 — Teks", type: "text", placeholder: "Pengaduan Warga" },
      { key: "button1Href", label: "Tombol 1 — Link", type: "url", placeholder: "/layanan/pengaduan" },
      { key: "button2Text", label: "Tombol 2 — Teks", type: "text", placeholder: "Layanan Administrasi" },
      { key: "button2Href", label: "Tombol 2 — Link", type: "url", placeholder: "/layanan/administrasi" },
    ],
  },
];

export default function AdminBerandaSectionsPage() {
  const [sectionContents, setSectionContents] = useState<Record<string, Record<string, string>>>({});
  const [sectionMeta, setSectionMeta] = useState<Record<string, { id: string; isVisible: boolean } | null>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const loadAll = async () => {
    const results: Record<string, Record<string, string>> = {};
    const metas: Record<string, { id: string; isVisible: boolean } | null> = {};
    for (const s of SECTIONS) {
      const sec = await getPageSection("home", s.key);
      const parsed = parseSectionContent(sec?.content || "{}", {});
      results[s.key] = parsed as Record<string, string>;
      metas[s.key] = sec ? { id: sec.id, isVisible: sec.isVisible } : null;
    }
    setSectionContents(results);
    setSectionMeta(metas);
  };

  useEffect(() => { loadAll(); }, []);

  const handleChange = (sectionKey: string, fieldKey: string, value: string) => {
    setSectionContents((prev) => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] || {}), [fieldKey]: value },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    try {
      await upsertPageSection({ page: "home", section: sectionKey, content: sectionContents[sectionKey] || {} });
      await loadAll();
      alert("Berhasil disimpan!");
    } catch (e) {
      alert("Gagal menyimpan.");
    } finally {
      setSaving(null);
    }
  };

  const handleToggle = async (sectionKey: string) => {
    const meta = sectionMeta[sectionKey];
    if (!meta) return;
    await toggleSectionVisibility(meta.id, !meta.isVisible);
    await loadAll();
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Pengaturan Section Beranda</h1>
        <p className="text-gray-500 text-sm mt-1">Ubah teks, judul, link, dan visibilitas setiap section pada halaman Beranda publik.</p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const meta = sectionMeta[sec.key];
          const isVisible = meta?.isVisible ?? true;
          const content = sectionContents[sec.key] || {};

          return (
            <div key={sec.key} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${isVisible ? "border-gray-100" : "border-gray-200 opacity-70"}`}>
              {/* Section Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{sec.label}</h3>
                    <p className="text-xs text-gray-500">{sec.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {meta && (
                    <button
                      onClick={() => handleToggle(sec.key)}
                      title={isVisible ? "Sembunyikan section" : "Tampilkan section"}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isVisible ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isVisible ? "Tampil" : "Tersembunyi"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Fields */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.fields.map((field) => (
                  <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={content[field.key] || ""}
                        onChange={(e) => handleChange(sec.key, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={content[field.key] || ""}
                        onChange={(e) => handleChange(sec.key, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="px-5 pb-5 flex justify-end">
                <button
                  onClick={() => handleSave(sec.key)}
                  disabled={saving === sec.key}
                  className="flex items-center px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving === sec.key ? "Menyimpan..." : "Simpan Section Ini"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
