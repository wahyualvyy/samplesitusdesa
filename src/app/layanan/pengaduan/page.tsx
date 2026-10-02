"use client";

import { useEffect, useState } from "react";
import { MessageSquareWarning, ShieldCheck, Send, CheckCircle2, Clock } from "lucide-react";
import { getComplaintList, createComplaint } from "@/actions/aduan";

// Helper to censor name (e.g. Budi Santoso -> B*** S******)
const censorName = (name: string) => {
  return name.split(' ').map(word => {
    if (word.length <= 1) return word;
    return word[0] + '*'.repeat(word.length - 1);
  }).join(' ');
};

export default function PengaduanPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [aduanList, setAduanList] = useState<any[]>([]);

  useEffect(() => {
    getComplaintList().then(data => {
      // Only show published or non-rejected complaints if desired, but here we show all for transparency
      setAduanList(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      nik: formData.get("nik") as string,
      phone: formData.get("phone") as string,
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      location: formData.get("location") as string,
    };

    const res = await createComplaint(data);
    if (res.success) {
      setTrackingId(res.trackingId || "");
      setSubmitted(true);
      // Refresh list
      getComplaintList().then(data => setAduanList(data));
    }
    setIsPending(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Laporan Terkirim!</h2>
          <p className="text-gray-500 mb-6">
            Terima kasih, laporan pengaduan Anda telah kami terima dan akan segera diverifikasi oleh tim kami. Nomor tiket pelacakan Anda adalah: <strong className="text-gray-900">{trackingId}</strong>.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Kembali Buat Laporan Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquareWarning className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Layanan Pengaduan Warga</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Sampaikan laporan, keluhan, atau aspirasi Anda terkait infrastruktur, pelayanan publik, atau masalah sosial di Desa Contoh.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12">
            
            <div className="flex items-start bg-blue-50 p-4 rounded-xl mb-8">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Kerahasiaan Dijamin</h4>
                <p className="text-xs text-blue-800/80 mt-1">Data diri Anda akan dijaga kerahasiaannya. Mohon isi form dengan data yang sebenar-benarnya untuk memudahkan proses tindak lanjut.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nama Lengkap *</label>
                  <input name="name" required type="text" placeholder="Masukkan nama Anda" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nomor Induk Kependudukan (NIK)</label>
                  <input name="nik" type="text" placeholder="16 digit NIK (Opsional)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nomor WhatsApp *</label>
                  <input name="phone" required type="tel" placeholder="08xxxxxxxxxx" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Kategori Laporan *</label>
                  <select name="category" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option value="">Pilih Kategori</option>
                    <option value="infrastruktur">Infrastruktur & Fasilitas Umum</option>
                    <option value="pelayanan">Pelayanan Administrasi</option>
                    <option value="sosial">Bantuan Sosial & Ekonomi</option>
                    <option value="kamtibmas">Keamanan & Ketertiban</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Judul Laporan *</label>
                <input name="title" required type="text" placeholder="Singkat, padat, dan jelas. Contoh: Jalan Berlubang di RT 03" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Isi Pengaduan / Detail Kejadian *</label>
                <textarea name="content" required rows={5} placeholder="Jelaskan secara rinci kronologi atau masalah yang terjadi..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Alamat Kejadian / Lokasi Spesifik *</label>
                <input name="location" required type="text" placeholder="Contoh: Gang Cempaka RT 04, depan Poskamling" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="pt-6">
                <button disabled={isPending} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70">
                  <Send className="w-5 h-5" />
                  <span>{isPending ? "Mengirim..." : "Kirim Laporan Pengaduan"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Public Complaints Feed */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">Transparansi Penanganan</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Laporan aduan yang masuk dan tanggapan dari pemerintah desa akan ditampilkan di sini. Nama pelapor kami samarkan demi menjaga privasi.
            </p>
          </div>

          <div className="space-y-6">
            {aduanList.map((aduan) => (
              <div key={aduan.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {aduan.name ? aduan.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{censorName(aduan.name || "Anonim")}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(aduan.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div>
                      {aduan.status === "DIPROSES" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5 mr-1.5" /> Diproses
                        </span>
                      ) : aduan.status === "SELESAI" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Selesai
                        </span>
                      ) : aduan.status === "DITERIMA" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          <MessageSquareWarning className="w-3.5 h-3.5 mr-1.5" /> Diterima
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                          {aduan.status}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="pl-0 md:pl-14">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{aduan.title}</h4>
                    <p className="text-gray-600 text-sm mb-6">{aduan.content}</p>
                    
                    {aduan.adminNote && (
                      <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 relative">
                        <div className="absolute -top-3 left-6 bg-white px-2 text-xs font-bold text-primary flex items-center border border-primary/10 rounded-full">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Tanggapan Desa
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed pt-2">
                          "{aduan.adminNote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {aduanList.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500">Belum ada aduan masyarakat.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
