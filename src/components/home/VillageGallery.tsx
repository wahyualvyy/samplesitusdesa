import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { getPageSection } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";

export default async function VillageGallery() {
  const [images, headingSection] = await Promise.all([
    prisma.galleryImage.findMany({ take: 8, orderBy: { id: "desc" } }),
    getPageSection("home", "gallery-heading"),
  ]);

  const heading = parseSectionContent(headingSection?.content || "{}", {
    title: "Galeri Desa",
    subtitle: "Koleksi foto kegiatan dan momen penting di desa.",
    linkText: "Lihat Semua Foto",
  });

  return (
    <section className="border-t border-border/50 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {heading.title}
            </h2>
            <p className="max-w-2xl text-muted-foreground">{heading.subtitle}</p>
          </div>
          <Link
            href="/informasi/galeri"
            className="mt-4 inline-flex items-center space-x-2 font-medium text-primary hover:text-primary/80 md:mt-0"
          >
            <span>{String(heading.linkText)}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`relative h-40 overflow-hidden rounded-2xl group ${
                index % 4 === 0 || index % 4 === 2 ? "md:h-64" : "md:h-40"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={img.title || "Galeri"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {img.title}
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              Belum ada foto di galeri.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
