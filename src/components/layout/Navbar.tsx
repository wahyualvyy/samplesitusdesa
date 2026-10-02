"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, Accessibility, Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { defaultSiteContent } from "@/lib/site-content";

export default function Navbar({ settings }: { settings?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const navbarClasses = isHome && !isScrolled 
    ? "bg-transparent text-white border-transparent" 
    : "bg-white/85 backdrop-blur-md text-foreground border-border/40 border-b shadow-sm";

  const linkHoverClasses = isHome && !isScrolled 
    ? "hover:text-accent/80 transition-colors" 
    : "hover:text-primary transition-colors";

  const siteName = settings?.siteName || defaultSiteContent.siteName;
  const email = settings?.email || defaultSiteContent.email;
  const phone = settings?.phone || defaultSiteContent.phone;
  const tagline = settings?.tagline || defaultSiteContent.tagline;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`hidden md:flex justify-between items-center px-6 lg:px-12 py-2 text-xs transition-colors duration-300 ${isHome && !isScrolled ? "bg-black/20 text-white/90" : "bg-primary text-primary-foreground"}`}>
        <div>Pemerintah {siteName}</div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3" />
            <span>{email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3" />
            <span>{phone}</span>
          </div>
          <button className="flex items-center space-x-2 hover:text-accent transition-colors">
            <Accessibility className="w-3 h-3" />
            <span>Aksesibilitas</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`px-6 lg:px-12 py-4 transition-all duration-300 ${navbarClasses}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isHome && !isScrolled ? "bg-white/20 group-hover:bg-white/30" : "bg-primary text-white"}`}>
              <span className="font-heading font-bold text-lg">DC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight">{siteName}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">{tagline}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm">
            <Link href="/" className={linkHoverClasses}>Beranda</Link>
            
            <div className="relative group">
              <button className={`flex items-center space-x-1 ${linkHoverClasses}`}>
                <span>Profil</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-2 left-0 w-48 bg-white text-foreground rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                <Link href="/profil" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm font-bold text-primary border-b border-gray-50 mb-1">Profil Utama</Link>
                <Link href="/profil/sejarah" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Sejarah Desa</Link>
                <Link href="/profil/visi-misi" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Visi & Misi</Link>
                <Link href="/profil/pemerintahan" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Pemerintahan Desa</Link>
              </div>
            </div>

            <div className="relative group">
              <button className={`flex items-center space-x-1 ${linkHoverClasses}`}>
                <span>Data Desa</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-2 left-0 w-48 bg-white text-foreground rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                <Link href="/data-desa/statistik" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Statistik Penduduk</Link>
                <Link href="/data-desa/apb-desa" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">APB Desa</Link>
              </div>
            </div>

            <div className="relative group">
              <button className={`flex items-center space-x-1 ${linkHoverClasses}`}>
                <span>Layanan</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-2 left-0 w-60 bg-white text-foreground rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                <Link href="/layanan/administrasi" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Administrasi & Surat Menyurat</Link>
                <Link href="/layanan/pengaduan" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Aduan Masyarakat</Link>
                <Link href="/data-desa/statistik" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Informasi Kependudukan</Link>
                <Link href="/data-desa/apb-desa" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Transparansi Keuangan (APBDes)</Link>
                <Link href="/potensi" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Direktori UMKM & Potensi</Link>
                <Link href="/layanan/ppid" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Layanan PPID</Link>
              </div>
            </div>

            <div className="relative group">
              <button className={`flex items-center space-x-1 ${linkHoverClasses}`}>
                <span>Potensi</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-2 left-0 w-48 bg-white text-foreground rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                <Link href="/potensi" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Potensi Desa</Link>
                <Link href="/potensi/umkm" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">UMKM</Link>
                <Link href="/potensi/wisata" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Wisata</Link>
              </div>
            </div>

            <div className="relative group">
              <button className={`flex items-center space-x-1 ${linkHoverClasses}`}>
                <span>Informasi</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-2 left-0 w-48 bg-white text-foreground rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                <Link href="/informasi/berita" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Berita</Link>
                <Link href="/informasi/pengumuman" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Pengumuman</Link>
                <Link href="/informasi/galeri" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Galeri</Link>
                <Link href="/informasi/surat" className="px-4 py-2 hover:bg-muted hover:text-primary text-sm">Surat Desa</Link>
              </div>
            </div>

            <Link href="/layanan" className={`px-5 py-2.5 rounded-full font-medium transition-transform active:scale-95 ${isHome && !isScrolled ? "bg-white text-primary hover:bg-gray-100" : "bg-primary text-white hover:bg-primary/90"}`}>
              Layanan Desa
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl max-h-[80vh] overflow-y-auto text-foreground flex flex-col">
          <div className="p-4 flex flex-col space-y-4 font-medium">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-muted rounded-lg">Beranda</Link>
            <Link href="/profil" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-muted rounded-lg">Profil Desa</Link>
            
            <div className="h-px bg-border my-1"></div>
            <div className="px-4 py-1 text-primary font-bold text-xs uppercase tracking-wide">Menu Layanan Terpadu</div>
            <Link href="/layanan/administrasi" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Administrasi & Surat</Link>
            <Link href="/layanan/pengaduan" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Aduan Masyarakat</Link>
            <Link href="/data-desa/statistik" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Data Kependudukan</Link>
            <Link href="/data-desa/apb-desa" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Transparansi Keuangan</Link>
            <Link href="/potensi" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Potensi Desa</Link>
            <Link href="/potensi/umkm" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Katalog UMKM</Link>
            <Link href="/potensi/wisata" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Potensi Wisata</Link>
            
            <div className="h-px bg-border my-1"></div>
            <div className="px-4 py-1 text-primary font-bold text-xs uppercase tracking-wide">Pusat Informasi</div>
            <Link href="/informasi/berita" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Berita Desa</Link>
            <Link href="/informasi/pengumuman" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Pengumuman</Link>
            <Link href="/informasi/galeri" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Galeri</Link>
            <Link href="/informasi/surat" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 pl-6 hover:bg-muted rounded-lg text-sm">Surat Desa</Link>

            <div className="h-px bg-border my-2"></div>
            <Link href="/layanan" onClick={() => setMobileMenuOpen(false)} className="mx-4 text-center bg-primary text-white py-3 rounded-xl">
              Layanan Desa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
