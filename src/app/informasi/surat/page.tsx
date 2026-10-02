import { FileText } from "lucide-react";
import SuratList from "@/components/public/surat/SuratList";
import { getDocumentTemplates } from "@/actions/document-template";

export const metadata = {
  title: "Layanan Surat Desa",
  description: "Download dokumen administrasi desa secara mudah dan cepat.",
};

export default async function SuratDesaPage() {
  const templates = await getDocumentTemplates(true);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#0f3d21] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Layanan Surat Desa</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Download dokumen administrasi desa secara mudah dan cepat. Lengkapi kebutuhan pengurusan surat-menyurat Anda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <SuratList templates={templates} />
      </div>
    </div>
  );
}
