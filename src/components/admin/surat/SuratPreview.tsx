"use client";

import { X, Download } from "lucide-react";
import { useState } from "react";

export default function SuratPreview({
  isOpen,
  onClose,
  surat,
}: {
  isOpen: boolean;
  onClose: () => void;
  surat: any | null;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !surat) return null;

  let parsed = { header: "", title: "", body: "", footer: "" };
  try {
    parsed = JSON.parse(surat.content);
  } catch (e) {
    // ignore
  }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/80">
          <h2 className="text-lg font-bold text-gray-900">Preview: {surat.name}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full transition-colors flex items-center disabled:opacity-50"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Preview Area */}
        <div className="p-8 overflow-y-auto bg-gray-100 flex-1 flex justify-center">
          
          {/* Simulated A4 Paper */}
          <div className="bg-white shadow-md w-full max-w-[210mm] min-h-[297mm] px-10 py-12 text-black font-serif text-base border border-gray-200">
            
            {/* Header / Kop */}
            <div className="text-center border-b-2 border-black pb-4 mb-8">
              {parsed.header.split('\n').map((line: string, i: number, arr: string[]) => (
                <div key={i} className={i === arr.length - 1 ? "font-bold text-xl uppercase" : "text-lg uppercase"}>
                  {line}
                </div>
              ))}
            </div>

            {/* Title */}
            <div className="text-center mb-10">
              <h3 className="font-bold text-xl underline uppercase leading-tight inline-block border-b border-black">
                {parsed.title}
              </h3>
              <p className="mt-1">Nomor: 140/ .... /438.7.9.14/2026</p>
            </div>

            {/* Body */}
            <div className="text-justify whitespace-pre-wrap leading-relaxed min-h-[300px]">
              {parsed.body}
            </div>

            {/* Footer / Signature */}
            <div className="mt-16 flex justify-end">
              <div className="text-center w-64">
                <p>Sidoarjo, {new Date().getDate()} {new Date().toLocaleString('id-ID', { month: 'long' })} {new Date().getFullYear()}</p>
                
                {parsed.footer.split('\n').map((line: string, i: number) => (
                  <p key={i} className="font-bold">{line}</p>
                ))}
                
                <div className="h-24"></div> {/* Space for signature */}
                
                <p className="font-bold underline">( ____________________ )</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
