"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, FileText, Download, Megaphone } from "lucide-react";
import { getPengumuman } from "@/actions/berita";

export default function PengumumanDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPengumuman(id);
        if (data) {
          setAnnouncement({
            id: data.id,
            title: data.title,
            status: data.status || "Biasa",
            date: new Date(data.date || data.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            content: data.content,
            hasAttachment: false // Add logic if you add attachment URL to DB
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pengumuman Tidak Ditemukan</h1>
        <Link href="/informasi/pengumuman" className="text-primary hover:underline">Kembali ke Daftar Pengumuman</Link>
      </div>
    );
  }

  const priority = announcement.status;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <Link href="/informasi/pengumuman" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Kembali ke Daftar Pengumuman</span>
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200 relative overflow-hidden">
          
          {/* Status Indicator */}
          <div className={`absolute top-0 left-0 w-2 h-full ${
            priority === 'Penting' ? 'bg-red-500' : 
            priority === 'Rutin' ? 'bg-blue-500' : 'bg-gray-300'
          }`}></div>

          <div className="pl-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs flex items-center ${
                priority === 'Penting' ? 'bg-red-100 text-red-700' : 
                priority === 'Rutin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                <Megaphone className="w-3.5 h-3.5 mr-1.5" />
                {priority}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                {announcement.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8 leading-tight">
              {announcement.title}
            </h1>

            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-900 prose-a:text-primary mb-10">
              {announcement.content.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>

            {announcement.hasAttachment && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Lampiran Dokumen</h3>
                <button className="inline-flex items-center space-x-3 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group w-full sm:w-auto">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-gray-900">Dokumen_Edaran.pdf</div>
                    <div className="text-xs text-gray-500">PDF • 2.4 MB</div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-primary ml-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
