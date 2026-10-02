import Link from "next/link";
import { MessageSquareWarning, FileSignature, ArrowRight } from "lucide-react";
import { getPageSection } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";

export default async function CallToAction() {
  const s = await getPageSection("home", "cta");
  const content = parseSectionContent(s?.content || "{}", {
    title: "Punya Pertanyaan atau Ingin Mengajukan Layanan?",
    subtitle: "Pemerintah Desa siap melayani kebutuhan administrasi dan menampung aspirasi masyarakat untuk kemajuan bersama.",
    button1Text: "Pengaduan Warga",
    button1Href: "/layanan/pengaduan",
    button2Text: "Layanan Administrasi",
    button2Href: "/layanan/administrasi",
  });

  if (s && !s.isVisible) return null;

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          {content.title}
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
          {content.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href={String(content.button1Href)}
            className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-accent/90 hover:scale-105 transition-all shadow-xl shadow-accent/20 group"
          >
            <MessageSquareWarning className="w-6 h-6" />
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/80">Lapor Sekarang</span>
              <span>{String(content.button1Text)}</span>
            </div>
            <ArrowRight className="w-5 h-5 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href={String(content.button2Href)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 hover:scale-105 transition-all shadow-xl group"
          >
            <FileSignature className="w-6 h-6" />
            <div className="text-left flex flex-col">
              <span className="text-xs uppercase tracking-wider text-primary/70">Urus Dokumen</span>
              <span>{String(content.button2Text)}</span>
            </div>
            <ArrowRight className="w-5 h-5 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
