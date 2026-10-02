import { FileText, FileCheck, Users, Briefcase, ChevronRight, FileBadge } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Pembuatan Kartu Keluarga (KK) Baru",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600",
    requirements: [
      "Surat Pengantar RT/RW",
      "Buku Nikah / Akta Perkawinan (Fotokopi)",
      "Kartu Keluarga Lama (Asli)"
    ]
  },
  {
    id: 2,
    title: "Surat Keterangan Usaha (SKU)",
    icon: <Briefcase className="w-8 h-8" />,
    color: "bg-amber-100 text-amber-600",
    requirements: [
      "Surat Pengantar RT/RW",
      "Fotokopi KTP & KK",
      "Foto Tempat Usaha",
      "Surat Pernyataan Memiliki Usaha"
    ]
  },
  {
    id: 3,
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    icon: <FileBadge className="w-8 h-8" />,
    color: "bg-red-100 text-red-600",
    requirements: [
      "Surat Pengantar RT/RW",
      "Fotokopi KTP & KK",
      "Surat Pernyataan Tidak Mampu bermaterai",
      "Foto Rumah (Depan & Dalam)"
    ]
  },
  {
    id: 4,
    title: "Surat Keterangan Pindah Domisili",
    icon: <FileCheck className="w-8 h-8" />,
    color: "bg-emerald-100 text-emerald-600",
    requirements: [
      "Surat Pengantar RT/RW",
      "Fotokopi KTP & KK",
      "Alamat Tujuan Pindah Lengkap",
      "Pas Foto 3x4 (2 Lembar)"
    ]
  }
];

export default function AdministrasiPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Layanan Administrasi Desa</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Informasi lengkap mengenai persyaratan dan prosedur pelayanan surat-menyurat di Kantor Kepala Desa Contoh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${service.color}`}>
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-heading font-bold text-gray-900 leading-tight">
                    {service.title}
                  </h2>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">Persyaratan Dokumen:</h3>
                <ul className="space-y-3">
                  {service.requirements.map((req, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mr-3 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Butuh Layanan Lainnya?</h2>
            <p className="text-gray-500">
              Pemerintah Desa Contoh juga melayani pembuatan berbagai surat pengantar dan keterangan lainnya. Silakan datang langsung ke Kantor Desa pada jam kerja (Senin - Jumat, 08:00 - 15:00) dengan membawa identitas diri.
            </p>
          </div>
          <Link href="/layanan/pengaduan" className="shrink-0 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center">
            Hubungi Petugas
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
