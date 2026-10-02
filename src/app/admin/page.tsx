import {
  Users, FileText, MessageSquareWarning, Wallet,
  TrendingUp, ArrowRight, CheckCircle2, Clock, AlertCircle, XCircle,
  Map, Home, Activity, UserCheck, Building2
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/statistik";
import { getBeritaList } from "@/actions/berita";
import { getComplaintList } from "@/actions/aduan";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const statusColor: Record<string, string> = {
  DITERIMA: "bg-red-100 text-red-700 border-red-200",
  DIPROSES: "bg-amber-100 text-amber-700 border-amber-200",
  SELESAI: "bg-green-100 text-green-700 border-green-200",
  DITOLAK: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusIcon: Record<string, React.ReactNode> = {
  DITERIMA: <AlertCircle className="w-3 h-3" />,
  DIPROSES: <Clock className="w-3 h-3" />,
  SELESAI: <CheckCircle2 className="w-3 h-3" />,
  DITOLAK: <XCircle className="w-3 h-3" />,
};

export default async function AdminDashboard() {
  const [stats, complaints] = await Promise.all([
    getDashboardStats(),
    getComplaintList(),
  ]);

  const latestAduan = complaints.slice(0, 5);
  const serapanBelanja = stats.apbdes
    ? Math.round(
        (stats.apbdes.categories
          .filter((c: any) => c.type === 'BELANJA')
          .reduce((s: number, c: any) => s + c.realisasi, 0) /
          (stats.apbdes.belanja || 1)) * 100
      )
    : 0;

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-screen-2xl">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2318] via-[#0f3d21] to-[#1a5c34] rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#4ade80,_transparent_60%)]" />
        <div className="relative z-10">
          <p className="text-emerald-400 font-medium text-sm mb-1">Selamat datang kembali 👋</p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">Dashboard Monitoring Desa</h1>
          <p className="text-white/70 max-w-2xl text-sm">
            Ringkasan eksekutif dan statistik waktu-nyata. Pantau perkembangan demografi, realisasi keuangan, dan pelayanan warga.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 opacity-5">
          <Building2 className="w-48 h-48" />
        </div>
      </div>

      {/* KPI Cards — Real Data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Penduduk",
            value: stats.totalPenduduk.toLocaleString("id-ID"),
            unit: "Jiwa",
            sub: `L: ${stats.lakiLaki.toLocaleString("id-ID")} / P: ${stats.perempuan.toLocaleString("id-ID")}`,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
            href: "/admin/penduduk",
          },
          {
            label: "Serapan APBDes",
            value: `${serapanBelanja}%`,
            unit: "",
            sub: stats.apbdes ? `Tahun ${stats.apbdes.year}` : "Belum ada data",
            icon: Wallet,
            color: "bg-emerald-50 text-emerald-600",
            href: "/admin/apbdes",
          },
          {
            label: "Aduan Masuk",
            value: stats.totalAduan.toString(),
            unit: "Total",
            sub: `${stats.aduanBaru} Baru • ${stats.aduanDiproses} Diproses`,
            icon: MessageSquareWarning,
            color: "bg-rose-50 text-rose-600",
            href: "/admin/aduan",
          },
          {
            label: "UMKM & Wisata",
            value: (stats.totalUmkm + stats.totalWisata).toString(),
            unit: "Entri",
            sub: `${stats.totalUmkm} UMKM • ${stats.totalWisata} Wisata`,
            icon: Map,
            color: "bg-amber-50 text-amber-600",
            href: "/admin/potensi",
          },
        ].map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl ${kpi.color} flex items-center justify-center shrink-0`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 mb-0.5">{kpi.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 leading-tight">{kpi.value}</span>
                {kpi.unit && <span className="text-xs text-slate-400">{kpi.unit}</span>}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{kpi.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* APBDes Realisasi — Real Data */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Realisasi APBDes {stats.apbdes?.year || new Date().getFullYear()}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Persentase serapan anggaran belanja per kategori</p>
            </div>
            <Link href="/admin/apbdes" className="text-xs text-primary font-medium hover:text-primary/80 flex items-center gap-1">
              Kelola <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {stats.apbdes ? (
            <div className="space-y-4">
              {/* Summary row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-medium text-green-600 uppercase tracking-wide mb-1">Pendapatan</p>
                  <p className="font-bold text-green-800 text-sm">{formatRupiah(stats.apbdes.pendapatan)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-medium text-red-600 uppercase tracking-wide mb-1">Belanja</p>
                  <p className="font-bold text-red-800 text-sm">{formatRupiah(stats.apbdes.belanja)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wide mb-1">Pembiayaan</p>
                  <p className="font-bold text-blue-800 text-sm">{formatRupiah(stats.apbdes.pembiayaan)}</p>
                </div>
              </div>

              {/* Categories */}
              {stats.apbdes.categories
                .filter((c: any) => c.type === 'BELANJA')
                .map((cat: any, i: number) => {
                  const pct = cat.amount > 0 ? Math.min(Math.round((cat.realisasi / cat.amount) * 100), 100) : 0;
                  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500'];
                  return (
                    <div key={cat.id}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-slate-700 truncate max-w-[200px]">{cat.name}</span>
                        <span className="font-bold text-slate-900 ml-2">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className={`${colors[i % colors.length]} h-2 rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              Belum ada data APBDes. <Link href="/admin/apbdes" className="text-primary font-medium">Tambah Sekarang</Link>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Demografi */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Statistik Demografi</h2>
              <Link href="/admin/penduduk" className="text-xs text-primary font-medium hover:text-primary/80">Kelola</Link>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Laki-laki</div>
                  <div className="font-bold text-slate-900 text-sm">{stats.lakiLaki.toLocaleString("id-ID")} jiwa</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Perempuan</div>
                <div className="font-bold text-slate-900 text-sm">{stats.perempuan.toLocaleString("id-ID")} jiwa</div>
              </div>
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 transition-all duration-700"
                style={{ width: `${stats.totalPenduduk > 0 ? (stats.lakiLaki / stats.totalPenduduk) * 100 : 50}%` }}
              />
              <div className="bg-rose-400 flex-1" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{stats.totalPenduduk > 0 ? ((stats.lakiLaki / stats.totalPenduduk) * 100).toFixed(1) : 0}% Laki-laki</span>
              <span>{stats.totalPenduduk > 0 ? ((stats.perempuan / stats.totalPenduduk) * 100).toFixed(1) : 0}% Perempuan</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between">
              <div className="text-center">
                <div className="font-bold text-slate-900">{stats.kepalaKeluarga.toLocaleString("id-ID")}</div>
                <div className="text-[10px] text-slate-400">Kepala Keluarga</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">{stats.totalPenduduk.toLocaleString("id-ID")}</div>
                <div className="text-[10px] text-slate-400">Total Jiwa</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Aksi Cepat</h2>
            <div className="space-y-1.5">
              {[
                { label: "Tulis Berita Baru", href: "/admin/berita/create?type=berita", color: "text-blue-600 bg-blue-50" },
                { label: "Tambah Pengumuman", href: "/admin/berita/create?type=pengumuman", color: "text-amber-600 bg-amber-50" },
                { label: "Tambah Data Warga", href: "/admin/penduduk/create", color: "text-emerald-600 bg-emerald-50" },
                { label: "Input Anggaran", href: "/admin/apbdes/create", color: "text-purple-600 bg-purple-50" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${action.color} text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  <span>{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aduan Terbaru — Real Data */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Aduan Masyarakat Terbaru</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {stats.aduanBaru} aduan baru menunggu tanggapan
            </p>
          </div>
          <Link href="/admin/aduan" className="text-xs text-primary font-medium hover:text-primary/80 flex items-center gap-1">
            Kelola Semua <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {latestAduan.length > 0 ? (
          <div className="space-y-3">
            {latestAduan.map((aduan: any) => (
              <div
                key={aduan.id}
                className="flex items-start gap-4 p-3 rounded-xl border border-slate-50 hover:bg-slate-50/80 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-600">
                    {aduan.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-slate-900 truncate">{aduan.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 shrink-0">{aduan.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{aduan.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {new Date(aduan.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border shrink-0 ${statusColor[aduan.status]}`}>
                  {statusIcon[aduan.status]}
                  {aduan.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 text-sm">
            Belum ada aduan masuk.
          </div>
        )}
      </div>

    </div>
  );
}
