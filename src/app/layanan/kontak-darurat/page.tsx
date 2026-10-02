import { PhoneCall, Ambulance, ShieldAlert, Flame, Zap, HeartPulse } from "lucide-react";

export default function KontakDaruratPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-red-600 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-white text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/20">
            <PhoneCall className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Kontak Darurat 24 Jam</h1>
          <p className="text-red-100 text-lg leading-relaxed max-w-2xl mx-auto">
            Daftar nomor telepon penting dan layanan darurat yang dapat dihubungi oleh masyarakat Desa Contoh saat situasi mendesak.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl mb-10 flex items-start space-x-4">
          <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-1">Peringatan Penting</h4>
            <p className="text-sm">Gunakan nomor-nomor darurat di bawah ini hanya untuk situasi yang benar-benar membutuhkan penanganan segera (kriminalitas, kecelakaan, kebakaran, atau bencana alam). Penyalahgunaan panggilan darurat dapat dikenakan sanksi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-red-300 transition-all group">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Ambulance className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Ambulans Desa</h2>
            <p className="text-gray-500 text-sm mb-4">Layanan transportasi medis darurat</p>
            <a href="tel:081234567890" className="text-3xl font-heading font-bold text-red-600 hover:text-red-700 transition-colors">
              0812-3456-7890
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-blue-300 transition-all group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Kepolisian (Polsek)</h2>
            <p className="text-gray-500 text-sm mb-4">Tindak kriminal atau gangguan keamanan</p>
            <a href="tel:110" className="text-3xl font-heading font-bold text-blue-600 hover:text-blue-700 transition-colors">
              110
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-orange-300 transition-all group">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Pemadam Kebakaran</h2>
            <p className="text-gray-500 text-sm mb-4">Kebakaran dan penyelamatan darurat</p>
            <a href="tel:113" className="text-3xl font-heading font-bold text-orange-600 hover:text-orange-700 transition-colors">
              113
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-yellow-300 transition-all group">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">PLN (Listrik)</h2>
            <p className="text-gray-500 text-sm mb-4">Gangguan listrik atau tiang tumbang</p>
            <a href="tel:123" className="text-3xl font-heading font-bold text-yellow-600 hover:text-yellow-700 transition-colors">
              123
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-emerald-300 transition-all group">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Puskesmas</h2>
            <p className="text-gray-500 text-sm mb-4">Layanan persalinan dan gawat darurat</p>
            <a href="tel:085299887766" className="text-2xl font-heading font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              0852-9988-7766
            </a>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center hover:shadow-lg hover:border-gray-300 transition-all group">
            <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Call Center Desa</h2>
            <p className="text-gray-500 text-sm mb-4">Informasi dan pelayanan administrasi</p>
            <a href="tel:082150208664" className="text-2xl font-heading font-bold text-gray-700 hover:text-gray-900 transition-colors">
              0821-5020-8664
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
