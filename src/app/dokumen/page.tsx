import { Download, FileText, FolderDown } from "lucide-react";

const documents = [
  { category: "Formulir Administrasi", items: [
    { name: "Formulir Pengantar RT/RW (Blanko)", size: "45 KB", format: "PDF" },
    { name: "Surat Kuasa Pengurusan KTP", size: "32 KB", format: "DOCX" },
    { name: "Formulir Permohonan Pembuatan SKU", size: "50 KB", format: "PDF" },
  ]},
  { category: "Peraturan Desa (Perdes)", items: [
    { name: "Perdes No. 1 Tahun 2026 tentang APBDes", size: "2.1 MB", format: "PDF" },
    { name: "Perdes No. 5 Tahun 2025 tentang BUMDes", size: "1.4 MB", format: "PDF" },
    { name: "Perdes No. 3 Tahun 2024 tentang Retribusi", size: "850 KB", format: "PDF" },
  ]},
  { category: "Laporan & Publikasi", items: [
    { name: "Laporan Pertanggungjawaban (LPJ) Tahun 2025", size: "5.5 MB", format: "PDF" },
    { name: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes)", size: "4.2 MB", format: "PDF" },
  ]}
];

export default function DownloadDokumenPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FolderDown className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Pusat Unduhan Dokumen</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Unduh berbagai blanko formulir administrasi, salinan peraturan desa, dan dokumen publik lainnya secara gratis.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-12">
        
        {documents.map((section, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center space-x-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold font-heading text-gray-900">{section.category}</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((doc, i) => (
                <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{doc.format}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center px-5 py-2.5 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all shrink-0 w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Unduh
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
