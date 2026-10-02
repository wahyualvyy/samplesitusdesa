"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Camera, UploadCloud, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveResident } from "@/actions/penduduk";
import Tesseract from "tesseract.js";

type AnggotaKK = {
  id: string; // temp id for UI
  nik: string;
  nama: string;
  gender: string;
  usia: string;
  agama: string;
  pendidikan: string;
  pekerjaan: string;
};

export default function CreateKKPage() {
  const router = useRouter();
  
  const [dusun, setDusun] = useState("Dusun I");
  const [anggota, setAnggota] = useState<AnggotaKK[]>([
    { id: "1", nik: "", nama: "", gender: "Laki-laki", usia: "", agama: "Islam", pendidikan: "SMA/Sederajat", pekerjaan: "Petani/Nelayan" }
  ]);
  
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddAnggota = () => {
    setAnggota([
      ...anggota,
      { id: Date.now().toString(), nik: "", nama: "", gender: "Laki-laki", usia: "", agama: "Islam", pendidikan: "SMA/Sederajat", pekerjaan: "Belum/Tidak Bekerja" }
    ]);
  };

  const handleRemoveAnggota = (id: string) => {
    setAnggota(anggota.filter(a => a.id !== id));
  };

  const handleChange = (id: string, field: keyof AnggotaKK, value: string) => {
    setAnggota(anggota.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleScanImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanProgress(0);

    try {
      const result = await Tesseract.recognize(
        file,
        'ind', // Indonesian
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setScanProgress(Math.round(m.progress * 100));
            }
          }
        }
      );
      
      const text = result.data.text;
      
      // Sangat simpel mock parsing KK OCR
      // Baris yang memiliki 16 digit angka biasanya adalah NIK
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const newAnggota: AnggotaKK[] = [];
      
      let index = 1;
      // Heuristic sederhana untuk demo OCR KK
      // Tesseract mungkin salah membaca beberapa karakter, tapi kita akan cari pola angka 16 digit untuk NIK
      lines.forEach((line) => {
        const nikMatch = line.match(/\b\d{16}\b/);
        if (nikMatch) {
          newAnggota.push({
            id: Date.now().toString() + index,
            nik: nikMatch[0],
            nama: "Hasil Scan " + index, // Nama sulit diekstrak tanpa layout analysis mendalam, jadi kita mock
            gender: "Laki-laki",
            usia: "30",
            agama: "Islam",
            pendidikan: "SMA/Sederajat",
            pekerjaan: "Wiraswasta"
          });
          index++;
        }
      });

      if (newAnggota.length > 0) {
        setAnggota(newAnggota);
        alert(`Berhasil mendeteksi ${newAnggota.length} NIK dari foto KK. Silakan lengkapi sisa datanya.`);
      } else {
        alert("Gagal mendeteksi NIK yang valid dari foto KK. Pastikan foto jelas dan terang.");
      }
      
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsScanning(false);
      setScanProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    // Validasi dasar
    const invalid = anggota.find(a => !a.nik || !a.nama || !a.usia);
    if (invalid) {
      alert("Mohon lengkapi NIK, Nama, dan Usia untuk semua anggota.");
      return;
    }

    setIsSaving(true);

    try {
      // Save all resident sequentially
      for (const a of anggota) {
        await saveResident({
          nik: a.nik,
          nama: a.nama,
          gender: a.gender,
          usia: a.usia,
          dusun: dusun,
          status: "Aktif",
          agama: a.agama,
          pendidikan: a.pendidikan,
          pekerjaan: a.pekerjaan
        });
      }
      router.push("/admin/penduduk");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data KK.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 relative pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/penduduk" className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Tambah Kartu Keluarga</h1>
            <p className="text-gray-500 text-sm mt-1">Input manual atau gunakan fitur scan OCR dari foto KK</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan Data KK"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Kolom Kiri: Pengaturan & Scanner */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Pengaturan Wilayah</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dusun / Alamat KK</label>
              <select 
                value={dusun}
                onChange={e => setDusun(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-gray-700"
              >
                <option value="Dusun I">Dusun I</option>
                <option value="Dusun II">Dusun II</option>
                <option value="Dusun III">Dusun III</option>
                <option value="Dusun IV">Dusun IV</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center">
              <Camera className="w-4 h-4 mr-2 text-primary" />
              Scanner Cerdas (OCR)
            </h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Unggah foto Kartu Keluarga (KK) yang jelas dan terang. Sistem akan mencoba membaca NIK secara otomatis menggunakan AI.
            </p>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleScanImage}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
              className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-8 h-8 text-primary mb-2 animate-spin" />
                  <span className="text-sm font-medium text-primary">Memindai... {scanProgress}%</span>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${scanProgress}%` }}></div>
                  </div>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-primary">Pilih Foto KK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Form Anggota */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Daftar Anggota Keluarga</h3>
              <button 
                onClick={handleAddAnggota}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Baris
              </button>
            </div>
            
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[1000px]">
                <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-[11px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 w-10 text-center">No</th>
                    <th className="px-4 py-3 w-52">NIK</th>
                    <th className="px-4 py-3 w-64">Nama Lengkap</th>
                    <th className="px-4 py-3 w-32">J.Kelamin</th>
                    <th className="px-4 py-3 w-24">Usia</th>
                    <th className="px-4 py-3 w-40">Agama / Pekerjaan</th>
                    <th className="px-4 py-3 w-16 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {anggota.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-center text-gray-500 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          value={item.nik}
                          onChange={(e) => handleChange(item.id, 'nik', e.target.value)}
                          placeholder="16 Digit NIK"
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono"
                          maxLength={16}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          value={item.nama}
                          onChange={(e) => handleChange(item.id, 'nama', e.target.value)}
                          placeholder="Nama Lengkap"
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          value={item.gender}
                          onChange={(e) => handleChange(item.id, 'gender', e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="number" 
                          value={item.usia}
                          onChange={(e) => handleChange(item.id, 'usia', e.target.value)}
                          placeholder="Thn"
                          className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-center"
                        />
                      </td>
                      <td className="px-4 py-3 space-y-2">
                        <select 
                          value={item.agama}
                          onChange={(e) => handleChange(item.id, 'agama', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
                        >
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                        </select>
                        <select 
                          value={item.pekerjaan}
                          onChange={(e) => handleChange(item.id, 'pekerjaan', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs"
                        >
                          <option value="Petani/Nelayan">Petani/Nelayan</option>
                          <option value="Wiraswasta">Wiraswasta</option>
                          <option value="Karyawan Swasta">Karyawan Swasta</option>
                          <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                          <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
                          <option value="Mengurus Rumah Tangga">Mengurus Rumah Tangga</option>
                          <option value="Belum/Tidak Bekerja">Belum/Tidak Bekerja</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => handleRemoveAnggota(item.id)}
                          disabled={anggota.length === 1}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
