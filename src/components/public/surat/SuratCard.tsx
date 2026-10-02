"use client";

import { FileText, Download, Eye } from "lucide-react";
import { useState } from "react";
import SuratPreview from "@/components/admin/surat/SuratPreview";

export default function SuratCard({ surat }: { surat: any }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(`/api/surat/generate?id=${surat.id}`);
      if (!res.ok) throw new Error("Gagal mengunduh surat");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${surat.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Gagal mengunduh template surat.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
        <FileText className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2">{surat.name}</h3>
      <p className="text-muted-foreground text-sm flex-1 mb-6">
        {surat.description || "Template dokumen administrasi desa."}
      </p>
      
      <div className="flex space-x-3 mt-auto">
        <button 
          onClick={() => setIsPreviewOpen(true)}
          className="flex-1 inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-border font-semibold py-2.5 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">Lihat</span>
        </button>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 inline-flex items-center justify-center space-x-2 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {isDownloading ? (
            <span className="text-sm">Memproses...</span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </>
          )}
        </button>
      </div>

      <SuratPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        surat={surat}
      />
    </div>
  );
}
