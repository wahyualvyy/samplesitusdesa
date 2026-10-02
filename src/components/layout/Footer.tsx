"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Camera, MonitorPlay, Clock } from "lucide-react";
import { defaultSiteContent } from "@/lib/site-content";

export default function Footer({ settings }: { settings?: any }) {
  const siteName = settings?.siteName || defaultSiteContent.siteName;
  const tagline = settings?.tagline || defaultSiteContent.tagline;
  const address = settings?.address || defaultSiteContent.address;
  const postalCode = settings?.postalCode || defaultSiteContent.postalCode;
  const phone = settings?.phone || defaultSiteContent.phone;
  const email = settings?.email || defaultSiteContent.email;

  return (
    <footer className="bg-[#0f3d21] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Government Identity */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center font-heading font-bold text-xl">
              DC
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-tight">{siteName}</span>
              <span className="text-xs text-white/80 uppercase tracking-wider">{tagline}</span>
            </div>
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed">
            Portal resmi Pemerintah {siteName}. Mewujudkan tata kelola pemerintahan desa yang transparan, inovatif, dan berorientasi pada pelayanan masyarakat.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-white flex items-center justify-center transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-white flex items-center justify-center transition-colors">
              <Camera className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-white flex items-center justify-center transition-colors">
              <MonitorPlay className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h3 className="font-heading font-bold text-lg text-accent">Navigasi</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
            <li><Link href="/profil" className="hover:text-white transition-colors">Profil Desa</Link></li>
            <li><Link href="/data-desa" className="hover:text-white transition-colors">Data Desa</Link></li>
            <li><Link href="/potensi" className="hover:text-white transition-colors">Potensi & Wisata</Link></li>
            <li><Link href="/informasi/berita" className="hover:text-white transition-colors">Berita Terkini</Link></li>
          </ul>
        </div>

        {/* Layanan Publik */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <h3 className="font-heading font-bold text-lg text-accent">Layanan Publik</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/layanan/administrasi" className="hover:text-white transition-colors">Layanan Administrasi</Link></li>
            <li><Link href="/layanan/pengaduan" className="hover:text-white transition-colors">Pengaduan Warga</Link></li>
            <li><Link href="/layanan/ppid" className="hover:text-white transition-colors">PPID (Keterbukaan Informasi)</Link></li>
            <li><Link href="/dokumen" className="hover:text-white transition-colors">Download Dokumen</Link></li>
            <li><Link href="/layanan/bansos" className="hover:text-white transition-colors">Informasi Bansos</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <h3 className="font-heading font-bold text-lg text-accent">Hubungi Kami</h3>
          
          <div className="flex items-start space-x-3 text-sm text-white/80">
            <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
            <p>{address}</p>
            <p>{postalCode}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-white/80 mt-2">
            <Phone className="w-5 h-5 text-accent shrink-0" />
            <p>{phone}</p>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-white/80 mt-2">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <p>{email}</p>
          </div>
          
          <div className="flex items-start space-x-3 text-sm text-white/80 mt-2">
            <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p>Senin – Kamis: 08.00 – 15.00</p>
              <p>Jumat: 08.00 – 11.00</p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
        <p>© 2026 Pemerintah {siteName}. Website Resmi.</p>
        <p className="mt-2 md:mt-0">Kode Wilayah: 12.34.56.7890</p>
      </div>
    </footer>
  );
}
