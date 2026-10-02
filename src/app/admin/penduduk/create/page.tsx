"use client";

import { useState, useEffect, Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, RefreshCw, Check } from "lucide-react";
import { saveResident, getResident } from "@/actions/penduduk";

const AGAMA = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];
const PENDIDIKAN = ["Tidak/Belum Sekolah", "SD/Sederajat", "SMP/Sederajat", "SMA/Sederajat", "D1/D2/D3", "S1", "S2/S3"];
const PEKERJAAN = ["Belum/Tidak Bekerja", "Petani/Nelayan", "Pedagang", "Wiraswasta", "Pegawai Swasta", "PNS", "TNI/POLRI", "Guru/Tenaga Pendidik", "Mahasiswa/Pelajar", "Ibu Rumah Tangga", "Pensiunan", "Lainnya"];
const DUSUN = ["Mekarsari", "Sukajaya", "Sukamaju", "Kenanga"];

function CreatePendudukForm() {
  const [form, setForm] = useState({
    nik: "", nama: "", gender: "Laki-laki", dusun: "",
    status: "Aktif", usia: "", agama: "Islam",
    pendidikan: "SMA/Sederajat", pekerjaan: "Petani/Nelayan"
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams?.get("id");
    if (id) {
      setEditingId(id);
      getResident(id).then(item => {
        if (item) {
          setForm({
            nik: item.nik, nama: item.nama, gender: item.gender,
            dusun: item.dusun, status: item.status, usia: item.usia.toString(),
            agama: item.agama || "Islam",
            pendidikan: item.pendidikan || "SMA/Sederajat",
            pekerjaan: item.pekerjaan || "Petani/Nelayan",
          });
        }
      });
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await saveResident({ id: editingId, ...form, usia: Number(form.usia) });
      if (res.success) {
        setSaved(true);
        setTimeout(() => router.push("/admin/penduduk"), 800);
      } else {
        setError("Gagal menyimpan. NIK mungkin sudah terdaftar.");
      }
    });
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20";
  const labelCls = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="p-5 md:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/penduduk" className="p-2 bg-white text-slate-500 hover:text-slate-900 rounded-xl border border-slate-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">
            {editingId ? "Edit Data Warga" : "Tambah Data Warga"}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Lengkapi formulir identitas warga berikut dengan benar.</p>
        </div>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-5">

          {/* Identitas Dasar */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-4 pb-2 border-b border-slate-100">Identitas Kependudukan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>NIK (16 Digit)</label>
                <input type="text" required maxLength={16} value={form.nik} onChange={set("nik")} placeholder="0000000000000000" className={`${inputCls} font-mono`} />
              </div>
              <div>
                <label className={labelCls}>Nama Lengkap</label>
                <input type="text" required value={form.nama} onChange={set("nama")} placeholder="Nama lengkap sesuai KTP" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Jenis Kelamin</label>
                <select value={form.gender} onChange={set("gender")} className={inputCls}>
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Usia</label>
                <input type="number" required min={0} max={150} value={form.usia} onChange={set("usia")} placeholder="Usia dalam tahun" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Dusun</label>
                <select value={form.dusun} onChange={set("dusun")} className={inputCls}>
                  <option value="">-- Pilih Dusun --</option>
                  {DUSUN.map(d => <option key={d}>{d}</option>)}
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select value={form.status} onChange={set("status")} className={inputCls}>
                  <option>Aktif</option>
                  <option>Pindah</option>
                  <option>Meninggal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Sosial */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-4 pb-2 border-b border-slate-100">Data Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Agama</label>
                <select value={form.agama} onChange={set("agama")} className={inputCls}>
                  {AGAMA.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Pendidikan</label>
                <select value={form.pendidikan} onChange={set("pendidikan")} className={inputCls}>
                  {PENDIDIKAN.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Pekerjaan</label>
                <select value={form.pekerjaan} onChange={set("pekerjaan")} className={inputCls}>
                  {PEKERJAAN.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Link href="/admin/penduduk" className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors text-sm">
              Batal
            </Link>
            <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60 text-sm">
              {isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Berhasil Disimpan!" : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TambahPendudukPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Memuat...</div>}>
      <CreatePendudukForm />
    </Suspense>
  );
}
