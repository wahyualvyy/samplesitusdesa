import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function LatestNews() {
  const newsList = await prisma.news.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      category: true,
      author: true,
    }
  });

  if (newsList.length === 0) {
    return (
      <section className="py-20 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Berita Terkini</h2>
          <p className="text-muted-foreground">Belum ada berita yang diterbitkan.</p>
        </div>
      </section>
    );
  }

  const featuredNews = newsList[0];
  const sideNews = newsList.slice(1);

  return (
    <section className="py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Berita Terkini</h2>
            <p className="text-muted-foreground">Kabar terbaru seputar kegiatan dan program di Desa Contoh.</p>
          </div>
          <Link href="/informasi/berita" className="hidden md:inline-flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80">
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured News (Left) */}
          <div className="lg:col-span-7 group">
            <Link href={`/informasi/berita/${featuredNews.slug}`} className="block relative rounded-3xl overflow-hidden h-full min-h-[400px]">
              <Image 
                src={featuredNews.image || "https://picsum.photos/seed/967/800/600"} 
                alt={featuredNews.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                  {featuredNews.category?.name || "Umum"}
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 leading-tight group-hover:text-accent/90 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-xs text-white/70">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredNews.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{featuredNews.author?.name || "Admin"}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* 3 Latest News Cards (Right) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 justify-between">
            
            {sideNews.map((item) => (
              <Link href={`/informasi/berita/${item.slug}`} key={item.id} className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-md hover:border-primary/30 transition-all h-full">
                <div className="relative sm:w-2/5 aspect-video sm:aspect-auto sm:h-full overflow-hidden shrink-0">
                  <Image 
                    src={item.image || `https://picsum.photos/seed/${item.id}/800/600`}
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold rounded text-primary uppercase">
                    {item.category?.name || "Umum"}
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-center sm:w-3/5">
                  <h4 className="font-heading font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/informasi/berita" className="inline-flex px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}

