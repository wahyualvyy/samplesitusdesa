import Link from "next/link";
import { Quote, ArrowRight, User } from "lucide-react";
import prisma from "@/lib/prisma";
import { getPageSection } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";

export default async function WelcomeMessage() {
  const defaultSambutan = "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di Website Resmi Pemerintah Desa Simoketawang.\n\nPuji syukur senantiasa kita panjatkan kehadirat Allah SWT. Di era digital ini, ketersediaan informasi yang cepat, akurat, dan transparan menjadi sebuah kebutuhan mutlak bagi masyarakat. Website ini dibangun sebagai wujud komitmen kami dalam mewujudkan e-Government di tingkat desa.\n\nMelalui portal ini, kami berharap dapat mendekatkan pelayanan publik kepada warga, mempublikasikan potensi wisata dan ekonomi desa, serta menjadi jembatan transparansi pembangunan dan anggaran desa kepada seluruh masyarakat Desa Simoketawang.";

  const [kades, headingSection] = await Promise.all([
    prisma.villageOfficial.findFirst({ where: { position: "Kepala Desa", type: "PEMDES" } }),
    getPageSection("home", "welcome-heading"),
  ]);

  const heading = parseSectionContent(headingSection?.content || "{}", {
    title: "Sambutan Kepala Desa",
    linkText: "Lihat Profil Pemerintahan Lengkap",
    linkHref: "/profil/pemerintahan",
  });

  const sambutan = kades?.description || defaultSambutan;

  return (
    <section className="py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-border/50 relative overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Portrait */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100 flex items-center justify-center">
                {kades?.image ? (
                  <img src={kades.image} alt={kades.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-20 h-20 text-gray-400" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="w-10 h-1 bg-accent mb-3 rounded-full"></div>
                  <h3 className="font-heading font-bold text-xl">{kades?.name || "Kepala Desa"}</h3>
                  <p className="text-white/80 text-sm">{kades?.position || "Kepala Desa"}</p>
                </div>
              </div>
            </div>

            {/* Right: Speech */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <Quote className="w-12 h-12 text-accent/30 mb-4" />
                <h2 className="text-3xl font-heading font-bold text-foreground mb-2">{heading.title}</h2>
                <div className="w-16 h-1.5 bg-primary rounded-full"></div>
              </div>

              <div className="prose prose-lg text-muted-foreground mb-8 space-y-4">
                {sambutan.split("\n").filter((p) => p.trim() !== "").slice(0, 2).map((paragraph, index) => {
                  if (index === 0) {
                    return (
                      <p key={index} className="text-lg font-medium text-foreground/80 leading-relaxed italic">
                        &ldquo;{paragraph}&rdquo;
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}...</p>;
                })}
              </div>

              <Link
                href={String(heading.linkHref)}
                className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors group"
              >
                <span>{String(heading.linkText)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
