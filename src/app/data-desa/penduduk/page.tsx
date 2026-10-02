
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Halaman Data Desa - Penduduk</h1>
        <p className="text-gray-500 mb-8">
          Halaman ini telah berhasil dibuat. Saat ini diisi dengan data dummy (placeholder) untuk keperluan pratinjau antarmuka dan penelusuran (navigation).
        </p>
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
