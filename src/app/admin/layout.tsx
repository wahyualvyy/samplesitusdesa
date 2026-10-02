"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Users, Wallet, Settings, LogOut,
  Bell, Menu, X, MessageSquareWarning, ChevronRight, Landmark,
  Home, BookOpen, FolderOpen, ChevronDown, Map, Activity,
  ExternalLink, Shield, LayoutGrid
} from "lucide-react";

const navGroups = [
  {
    label: "Utama",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    ]
  },
  {
    label: "Konten & Informasi",
    items: [
      { name: "Beranda & Tampilan", href: "/admin/beranda", icon: Home },
      { name: "Section Beranda (CMS)", href: "/admin/beranda/sections", icon: LayoutGrid },
      { name: "Profil Desa", href: "/admin/profil", icon: Landmark },
      { name: "Berita & Media", href: "/admin/berita", icon: FileText },
      { name: "Surat Desa", href: "/admin/informasi/surat", icon: FileText },
    ]
  },
  {
    label: "Data Desa",
    items: [
      { name: "Data Penduduk", href: "/admin/penduduk", icon: Users },
      { name: "Keuangan APBDes", href: "/admin/apbdes", icon: Wallet },
      { name: "Potensi & UMKM", href: "/admin/potensi", icon: Map },
      { name: "Layanan Publik", href: "/admin/layanan", icon: BookOpen },
      { name: "Dokumen Publik", href: "/admin/dokumen", icon: FolderOpen },
    ]
  },
  {
    label: "Pelayanan",
    items: [
      { name: "Aduan Masyarakat", href: "/admin/aduan", icon: MessageSquareWarning },
    ]
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [recentAduan, setRecentAduan] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch('/api/admin/notifications');
        if (res.ok) {
          const data = await res.json();
          setRecentAduan(data.items || []);
          setUnreadCount(data.unread || 0);
        }
      } catch (e) {
        // fallback: no notifications
      }
    }
    loadNotifications();
  }, []);

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen) setUnreadCount(0);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Get page title from pathname
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.startsWith('/admin/beranda/sections')) return 'Section Beranda (CMS)';
    if (pathname.startsWith('/admin/beranda')) return 'Beranda & Tampilan';
    if (pathname.startsWith('/admin/profil/bpd')) return 'BPD & Anggota';
    if (pathname.startsWith('/admin/profil')) return 'Profil Desa';
    if (pathname.startsWith('/admin/berita')) return 'Berita & Media';
    if (pathname.startsWith('/admin/penduduk')) return 'Data Penduduk';
    if (pathname.startsWith('/admin/apbdes')) return 'Keuangan APBDes';
    if (pathname.startsWith('/admin/potensi')) return 'Potensi & UMKM';
    if (pathname.startsWith('/admin/layanan')) return 'Layanan Publik';
    if (pathname.startsWith('/admin/dokumen')) return 'Dokumen Publik';
    if (pathname.startsWith('/admin/aduan')) return 'Aduan Masyarakat';
    return 'Administrator';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 flex-shrink-0 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-[#0a2318] text-white
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-white leading-tight">Desa Panel</div>
              <div className="text-[10px] text-white/50 leading-tight">Administrator</div>
            </div>
          </div>
          <button
            className="md:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Groups */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1.5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, (item as any).exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-150 group
                        ${active
                          ? "bg-white/10 text-white shadow-inner"
                          : "text-white/60 hover:bg-white/5 hover:text-white/90"
                        }
                      `}
                    >
                      <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/60'}`} />
                      <span>{item.name}</span>
                      {active && <div className="ml-auto w-1 h-4 bg-emerald-400 rounded-full" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-1 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-3 py-2.5 w-full text-white/50 hover:bg-white/5 hover:text-white/80 rounded-xl text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>Lihat Website Publik</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2.5 w-full text-white/50 hover:bg-red-500/10 hover:text-red-300 rounded-xl text-sm font-medium transition-colors text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-slate-800 text-base leading-tight">{getPageTitle()}</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Desa Panel — Sistem Informasi Desa</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={handleNotifClick}
                className={`relative p-2.5 rounded-xl transition-colors ${isNotifOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">Aduan Masuk</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                    {recentAduan.length > 0 ? recentAduan.map((aduan: any) => (
                      <Link
                        key={aduan.id}
                        href={`/admin/aduan`}
                        onClick={() => setIsNotifOpen(false)}
                        className="block p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{aduan.title}</h4>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">Baru</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{aduan.name} • {aduan.category}</p>
                      </Link>
                    )) : (
                      <div className="p-6 text-center text-sm text-slate-400">
                        Tidak ada aduan baru
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100">
                    <Link
                      href="/admin/aduan"
                      onClick={() => setIsNotifOpen(false)}
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center justify-center gap-1"
                    >
                      Lihat Semua Aduan
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 ml-1">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900 leading-tight">Admin Desa</span>
                <span className="text-[11px] text-slate-400 leading-tight">Superadmin</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
