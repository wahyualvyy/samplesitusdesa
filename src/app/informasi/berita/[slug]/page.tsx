import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
    }
  });

  if (!news || !news.isPublished) {
    notFound();
  }

  // Fetch recent news for sidebar
  const recentNews = await prisma.news.findMany({
    where: { 
      isPublished: true,
      id: { not: news.id } // Exclude current
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { category: true }
  });

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#0f3d21] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <Link href="/informasi/berita" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Berita</span>
          </Link>
          <div className="mb-6 flex justify-center">
            <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-md uppercase tracking-wider">
              {news.category?.name || "Umum"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{news.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{news.author?.name || "Admin"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-10 shadow-lg border border-gray-100">
            <Image 
              src={news.image || "https://picsum.photos/seed/news/800/600"} 
              alt={news.title} 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg prose-green max-w-none text-gray-700">
            {news.content.split('\n').map((paragraph, index) => (
              paragraph.trim() !== '' ? <p key={index}>{paragraph}</p> : <br key={index} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          {/* Recent News Widget */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-heading font-bold text-xl text-gray-900 mb-6 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-primary" />
              Berita Terkini
            </h3>
            <div className="space-y-6">
              {recentNews.map(item => (
                <Link href={`/informasi/berita/${item.slug}`} key={item.id} className="group block">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                      <Image 
                        src={item.image || "https://picsum.photos/seed/side/800/600"} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
