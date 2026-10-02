import { Wallet, PieChart, TrendingUp, Download, ArrowDownRight, ArrowUpRight, Scale } from "lucide-react";

export default function TransparansiAPBDes() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
            <Wallet className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Transparansi APBDes</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Anggaran Pendapatan dan Belanja Desa (APBDes) Contoh Tahun Anggaran 2026. Bentuk komitmen kami terhadap tata kelola keuangan yang terbuka dan akuntabel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        
        {/* Ringkasan Postur APBDes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 text-green-600 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Pendapatan</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Rp 2.150.000.000</h2>
            <p className="text-gray-500 text-sm">Target Pendapatan Desa Tahun 2026 yang bersumber dari Dana Desa, ADD, PADes, dan Lain-lain Pendapatan yang Sah.</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Belanja</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Rp 2.200.000.000</h2>
            <p className="text-gray-500 text-sm">Rencana Belanja Desa meliputi Penyelenggaraan Pemerintahan, Pembangunan, Pembinaan, dan Pemberdayaan.</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 text-blue-600 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Pembiayaan</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Rp 50.000.000</h2>
            <p className="text-gray-500 text-sm">Penerimaan Pembiayaan (Sisa Lebih Perhitungan Anggaran / SiLPA tahun sebelumnya) untuk menutupi defisit belanja.</p>
          </div>

        </div>

        {/* Realisasi Pelaksanaan */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-primary" />
                Rincian Bidang Belanja & Realisasi
              </h2>
              <p className="text-gray-500 text-sm">Update per Kuartal III (September 2026)</p>
            </div>
            <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 flex items-center transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Laporan (PDF)
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Bidang 1 */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
                <div>
                  <h4 className="font-bold text-gray-900">Bidang Penyelenggaraan Pemerintahan Desa</h4>
                  <p className="text-sm text-gray-500">Anggaran: Rp 750.000.000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">Rp 550.000.000</span>
                  <span className="text-sm text-gray-500 ml-2">(73.3%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-primary h-4 rounded-full" style={{ width: '73.3%' }}></div>
              </div>
            </div>

            {/* Bidang 2 */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
                <div>
                  <h4 className="font-bold text-gray-900">Bidang Pelaksanaan Pembangunan Desa</h4>
                  <p className="text-sm text-gray-500">Anggaran: Rp 950.000.000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600">Rp 807.500.000</span>
                  <span className="text-sm text-gray-500 ml-2">(85.0%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Bidang 3 */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
                <div>
                  <h4 className="font-bold text-gray-900">Bidang Pembinaan Kemasyarakatan</h4>
                  <p className="text-sm text-gray-500">Anggaran: Rp 150.000.000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-amber-500">Rp 120.000.000</span>
                  <span className="text-sm text-gray-500 ml-2">(80.0%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-amber-400 h-4 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            {/* Bidang 4 */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
                <div>
                  <h4 className="font-bold text-gray-900">Bidang Pemberdayaan Masyarakat</h4>
                  <p className="text-sm text-gray-500">Anggaran: Rp 300.000.000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-purple-600">Rp 195.000.000</span>
                  <span className="text-sm text-gray-500 ml-2">(65.0%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-purple-500 h-4 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Bidang 5 */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
                <div>
                  <h4 className="font-bold text-gray-900">Bidang Penanggulangan Bencana & Keadaan Darurat</h4>
                  <p className="text-sm text-gray-500">Anggaran: Rp 50.000.000</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-500">Rp 10.000.000</span>
                  <span className="text-sm text-gray-500 ml-2">(20.0%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-red-400 h-4 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Infografis/Ilustrasi tambahan */}
        <div className="bg-[#0f3d21] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Kawal Dana Desa Kita</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              Setiap rupiah dari anggaran desa difokuskan untuk kemajuan wilayah dan kesejahteraan masyarakat Desa Contoh. Kami mengundang partisipasi aktif warga untuk mengawasi pelaksanaan program.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-accent text-white font-bold rounded-xl shadow-lg hover:bg-accent/90 hover:scale-105 transition-all text-center">
              Laporkan Penyelewengan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
