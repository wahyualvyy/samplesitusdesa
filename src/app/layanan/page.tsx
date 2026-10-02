import Link from "next/link";
import { ArrowRight, LayoutGrid,
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, Building2, BookOpen,
  Map, Phone, Mail, Star
} from "lucide-react";
import { getAllVillageServices } from "@/actions/layanan";

const iconMap: Record<string, React.ElementType> = {
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, LayoutGrid, Building2,
  BookOpen, Map, Phone, Mail, Star,
};

export default async function LayananPortalPage() {
  const services = await getAllVillageServices();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">

      {/* Header */}
      <div className="bg-[#0f3d21] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Portal Layanan Desa</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Akses seluruh layanan mandiri, informasi publik, dan bantuan masyarakat terpadu dari Pemerintah Desa dalam satu portal.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="flex flex-col space-y-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || LayoutGrid;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
              >
                <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-2xl mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed max-w-3xl text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <div className="inline-flex items-center justify-center w-full md:w-auto px-6 py-4 bg-gray-50 text-gray-700 font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100 group-hover:border-primary">
                    <span className="mr-3">Akses Layanan</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}

          {services.length === 0 && (
            <div className="py-20 text-center text-gray-500 bg-white rounded-3xl border border-gray-200">
              <LayoutGrid className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p>Belum ada layanan yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
