import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Map, Phone } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function VillagePotential() {
  const umkmList = await prisma.uMKM.findMany({
    take: 4,
    orderBy: { id: "desc" },
  });
  
  const tourismList = await prisma.tourism.findMany({
    take: 1,
    orderBy: { id: "desc" },
  });
  const topTourism = tourismList[0];

  return (
    <div className="bg-[#F8FAF9] pt-20 pb-10">
      
      {/* 1. Potensi Desa Categories */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Potensi Desa</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kekayaan alam dan sumber daya manusia yang menjadi roda penggerak ekonomi Desa Contoh.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Pertanian', 'Perikanan', 'UMKM', 'Wisata', 'Ekonomi Kreatif', 'Lingkungan'].map((cat, i) => (
              <Link href={`/potensi/${cat.toLowerCase().replace(' ', '-')}`} key={i} className="group relative rounded-2xl overflow-hidden aspect-square flex items-end p-4">
                <Image 
                  src={`https://picsum.photos/seed/${i+10}/400/400`}
                  alt={cat} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/90 transition-colors duration-300"></div>
                <div className="relative z-10 w-full flex justify-between items-center text-white">
                  <span className="font-heading font-bold text-sm md:text-base">{cat}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. UMKM Marketplace */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 text-accent font-medium mb-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="uppercase tracking-wider text-sm">UMKM Desa</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground">Produk Unggulan Desa</h2>
            </div>
            <Link href="/potensi/umkm" className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 mt-4 md:mt-0">
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {umkmList.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={item.image || `https://picsum.photos/seed/${item.id}20/400/300`}
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary">
                    {item.category || "UMKM"}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center">
                    <UserIcon className="w-3 h-3 mr-1" /> {item.ownerName}
                  </p>
                  <p className="text-primary font-bold mb-4">{item.description || "UMKM Unggulan"}</p>
                  <a href={`https://wa.me/${item.phone}`} target="_blank" rel="noreferrer" className="mt-auto flex items-center justify-center space-x-2 w-full py-2 bg-green-50 text-green-700 hover:bg-green-100 font-medium rounded-xl transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Pesan via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
            
            {umkmList.length === 0 && (
              <div className="col-span-4 text-center py-10 text-muted-foreground">
                Belum ada data UMKM.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Village Tourism */}
      <section>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-primary rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
              <div className="p-10 md:p-16 text-white">
                <div className="inline-flex items-center space-x-2 text-accent font-medium mb-4">
                  <Map className="w-5 h-5" />
                  <span className="uppercase tracking-wider text-sm">Pesona Desa</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                  Jelajahi Wisata <br/><span className="text-accent">Desa Contoh</span>
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-md">
                  Nikmati keindahan alam pesisir pantai dan keramahan warga lokal yang akan memberikan pengalaman tak terlupakan.
                </p>
                <Link href="/potensi/wisata" className="inline-flex items-center space-x-2 px-8 py-3.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-all text-center shadow-lg shadow-accent/20">
                  <span>Lihat Destinasi Wisata</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <Image 
                  src={topTourism?.image || "https://picsum.photos/seed/30/800/600"}
                  alt={topTourism?.name || "Wisata Desa"} 
                  fill 
                  className="object-cover rounded-tl-[4rem] lg:rounded-l-[4rem]"
                />
                <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-white">
                  <h4 className="font-heading font-bold text-lg">{topTourism?.name || "Wisata Unggulan"}</h4>
                  <p className="text-sm text-white/80">{topTourism?.description || "Destinasi wisata unggulan dengan fasilitas lengkap."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
