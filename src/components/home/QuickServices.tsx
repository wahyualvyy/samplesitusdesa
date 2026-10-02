import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, LayoutGrid, Building2,
  BookOpen, Map, Phone, Mail, Star
} from "lucide-react";
import { getVillageServices } from "@/actions/layanan";
import { getPageSection } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";

// Map icon name (string) ke komponen Lucide React
const iconMap: Record<string, React.ElementType> = {
  FileSignature, MessageSquareWarning, ShieldCheck, HeartHandshake,
  PieChart, Users, Download, PhoneCall, LayoutGrid, Building2,
  BookOpen, Map, Phone, Mail, Star,
};

export default async function QuickServices() {
  const [services, headingSection] = await Promise.all([
    getVillageServices(),
    getPageSection("home", "services-heading"),
  ]);

  const heading = parseSectionContent(headingSection?.content || "{}", {
    title: "Layanan Cepat",
    subtitle: "Akses berbagai layanan publik dan informasi penting dengan mudah dan cepat.",
  });

  return (
    <section className="py-20 bg-background relative -mt-6 rounded-t-3xl z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {heading.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {heading.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || LayoutGrid;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col bg-card p-6 rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 border ${service.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                  <span>Akses Layanan</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
