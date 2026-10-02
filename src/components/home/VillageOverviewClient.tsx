"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Home, Map } from "lucide-react";
import Image from "next/image";

type Props = {
  heading: {
    badge: string;
    title: string;
    highlight: string;
    lokasi: string;
  };
  stats: {
    luas: string;
    dusun: string;
    penduduk: string;
    kk: string;
  };
  sejarah: string;
  galleryImages: string[];
};

export default function VillageOverviewClient({ heading, stats, sejarah, galleryImages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const img1 = galleryImages[activeIndex % Math.max(1, galleryImages.length)];
  const img2 = galleryImages[(activeIndex + 1) % Math.max(1, galleryImages.length)];
  const img3 = galleryImages[(activeIndex + 2) % Math.max(1, galleryImages.length)];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-gray-100">
                  {img1 && <Image src={img1} alt="Pemandangan 1" fill className="object-cover hover:scale-105 transition-all duration-700 ease-in-out" />}
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square relative bg-gray-100">
                  {img2 && <Image src={img2} alt="Pemandangan 2" fill className="object-cover hover:scale-105 transition-all duration-700 ease-in-out" />}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square relative bg-gray-100">
                  {img3 && <Image src={img3} alt="Pemandangan 3" fill className="object-cover hover:scale-105 transition-all duration-700 ease-in-out" />}
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-primary/5 flex flex-col justify-center items-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-primary mb-2">Lokasi Strategis</h4>
                  <p className="text-sm text-muted-foreground">{heading.lokasi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <div className="inline-flex items-center space-x-2 text-primary font-medium mb-4">
              <span className="w-8 h-px bg-primary"></span>
              <span className="uppercase tracking-wider text-sm">{heading.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 leading-tight">
              {heading.title} <span className="text-primary">{heading.highlight}</span>
            </h2>

            <div className="text-muted-foreground mb-8 leading-relaxed space-y-4">
              {sejarah
                .split("\n")
                .filter((p) => p.trim() !== "")
                .slice(0, 2)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 pb-10 border-b border-border">
              <div>
                <div className="flex items-center space-x-2 text-primary mb-2">
                  <Map className="w-5 h-5" />
                  <span className="font-medium text-sm">Luas Wilayah</span>
                </div>
                <p className="font-heading font-bold text-2xl">
                  {stats.luas}
                  <span className="text-base font-normal text-muted-foreground ml-1">km²</span>
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-primary mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium text-sm">Penduduk</span>
                </div>
                <p className="font-heading font-bold text-2xl">
                  {stats.penduduk}
                  <span className="text-base font-normal text-muted-foreground ml-1">Jiwa</span>
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-primary mb-2">
                  <Home className="w-5 h-5" />
                  <span className="font-medium text-sm">Kepala Keluarga</span>
                </div>
                <p className="font-heading font-bold text-2xl">
                  {stats.kk}
                  <span className="text-base font-normal text-muted-foreground ml-1">KK</span>
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-primary mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium text-sm">Dusun</span>
                </div>
                <p className="font-heading font-bold text-2xl">
                  {stats.dusun}
                  <span className="text-base font-normal text-muted-foreground ml-1">Wilayah</span>
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/profil"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors group"
              >
                <span>Selengkapnya Tentang Desa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
