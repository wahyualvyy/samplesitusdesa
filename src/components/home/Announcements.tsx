import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Announcements() {
  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" }
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Pengumuman Desa</h2>
              <p className="text-muted-foreground mb-8">
                Informasi penting dan pengumuman resmi dari Pemerintah Desa Contoh untuk seluruh warga.
              </p>
              <Link href="/informasi/pengumuman" className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
                <span>Semua Pengumuman</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-4">
              {announcements.map((item) => {
                const dateParts = item.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }).split(' ');
                
                return (
                <Link href={`/informasi/pengumuman/${item.id}`} key={item.id} className="group bg-card border border-border/60 p-6 rounded-2xl hover:border-amber-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6">
                  
                  {/* Date Block */}
                  <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-muted rounded-xl text-center border border-border/50 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                    <span className="text-2xl font-bold text-foreground group-hover:text-amber-700">{dateParts[0]}</span>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{dateParts[1]}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.status.toLowerCase().includes("penting") ? "bg-rose-100 text-rose-700 border-rose-200" : item.status.toLowerCase().includes("pelayanan") ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"}`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                  
                </Link>
              )})}
              {announcements.length === 0 && (
                <div className="text-muted-foreground py-8 text-center">
                  Belum ada pengumuman baru.
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
