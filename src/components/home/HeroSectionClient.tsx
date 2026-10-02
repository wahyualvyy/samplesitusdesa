"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, FileText } from "lucide-react";

interface Props {
  settings: {
    siteName: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBackground: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    jamPelayanan: string;
  } | null;
}

const DEFAULT = {
  heroTitle: "Selamat Datang di",
  heroSubtitle: "Portal informasi, transparansi, pelayanan publik, dan potensi Desa Contoh.",
  heroBackground: "https://picsum.photos/seed/200/1600/900",
  siteName: "Desa Contoh",
  kecamatan: "Kecamatan Contoh",
  kabupaten: "Kab. Contoh",
  provinsi: "Provinsi Contoh",
  jamPelayanan: "Senin – Kamis: 08.00 – 15.00|Jumat: 08.00 – 11.00",
};

export default function HeroSectionClient({ settings }: Props) {
  const s = settings || DEFAULT;

  const greeting1 = s.heroTitle || DEFAULT.heroTitle;
  const greeting2 = s.siteName || DEFAULT.siteName;
  const subtitle = s.heroSubtitle || DEFAULT.heroSubtitle;
  const backgroundImage = s.heroBackground || DEFAULT.heroBackground;
  const kecamatan = s.kecamatan || DEFAULT.kecamatan;
  const kabupaten = s.kabupaten || DEFAULT.kabupaten;
  const provinsi = s.provinsi || DEFAULT.provinsi;
  const jamPelayanan = (s.jamPelayanan || DEFAULT.jamPelayanan)
    .split("|")
    .map((line) => {
      const [hari, jam] = line.split(":");
      return { hari: hari?.trim(), jam: jam?.trim() };
    });

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    let i = 0;
    let j = 0;
    let current1 = "";
    let current2 = "";

    const typeLine1 = setInterval(() => {
      if (i < greeting1.length) {
        current1 += greeting1.charAt(i);
        setText1(current1);
        i++;
      } else {
        clearInterval(typeLine1);
        const typeLine2 = setInterval(() => {
          if (j < greeting2.length) {
            current2 += greeting2.charAt(j);
            setText2(current2);
            j++;
          } else {
            clearInterval(typeLine2);
          }
        }, 80);
      }
    }, 50);

    return () => clearInterval(typeLine1);
  }, [greeting1, greeting2]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-center bg-[#052314]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#052314]/90 via-[#052314]/60 to-[#052314]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-16">
        <div className="max-w-2xl text-white">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
            Website Resmi Pemerintah Desa
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 min-h-[120px] md:min-h-[150px] lg:min-h-[180px]">
            {text1}
            {text1.length < greeting1.length && (
              <span className="animate-pulse font-normal opacity-70">|</span>
            )}
            <br />
            <span className="text-accent">
              {text1.length === greeting1.length ? text2 : "\u00A0"}
              {text1.length === greeting1.length &&
                text2.length < greeting2.length && (
                  <span className="animate-pulse text-white font-normal opacity-70">|</span>
                )}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-4 font-light leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center space-x-2 text-white/80 mb-10 text-sm md:text-base">
            <span className="font-medium">{kecamatan}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-medium">{kabupaten}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-medium">{provinsi}</span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/profil"
              className="px-8 py-3.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-all text-center flex items-center justify-center space-x-2 group shadow-lg shadow-accent/20"
            >
              <span>Jelajahi Desa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/layanan"
              className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all text-center flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Layanan Masyarakat</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Info Widget */}
      {jamPelayanan.length > 0 && (
        <div className="hidden md:flex absolute bottom-12 right-12 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl">
          <div>
            <h3 className="font-heading font-bold mb-3 flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-accent" />
              <span>Jam Pelayanan Kantor</span>
            </h3>
            <div className="space-y-2 text-sm text-white/90">
              {jamPelayanan.map((jp, index) => (
                <div
                  key={index}
                  className={`flex justify-between space-x-6 ${
                    index < jamPelayanan.length - 1 ? "border-b border-white/10 pb-2" : "pt-1"
                  }`}
                >
                  <span>{jp.hari}</span>
                  <span className="font-medium">{jp.jam}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce text-white/60">
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}

function ClockIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
