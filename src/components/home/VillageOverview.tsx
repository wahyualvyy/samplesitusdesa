import prisma from "@/lib/prisma";
import { getVillageProfile } from "@/actions/profil";
import { getResidentDemographics } from "@/actions/penduduk";
import { getPageSection } from "@/actions/sections";
import { parseSectionContent } from "@/lib/parseSection";
import VillageOverviewClient from "./VillageOverviewClient";

export default async function VillageOverview() {
  const [profile, demografi, headingSection, umkmImages] = await Promise.all([
    getVillageProfile(),
    getResidentDemographics(),
    getPageSection("home", "overview-heading"),
    prisma.uMKM.findMany({ select: { image: true }, take: 6 }),
  ]);

  const heading = parseSectionContent(headingSection?.content || "{}", {
    badge: "Profil Singkat",
    title: "Mengenal Lebih Dekat",
    highlight: "Desa Simoketawang",
    lokasi: "Terletak di Kecamatan Wonoayu, Kabupaten Sidoarjo, Jawa Timur.",
  });

  const stats = {
    luas: profile?.luasWilayah || "-",
    dusun: profile?.jumlahDusun || "-",
    penduduk: demografi.totalPenduduk.toLocaleString("id-ID"),
    kk: demografi.kepalaKeluarga.toLocaleString("id-ID"),
  };

  const galleryImages = umkmImages
    .filter((u) => u.image)
    .map((u) => u.image as string);

  const defaultImages = [
    "https://picsum.photos/seed/523/800/600",
    "https://picsum.photos/seed/489/800/600",
    "https://picsum.photos/seed/823/800/600",
  ];

  const sejarah = profile?.sejarah || "Desa ini memiliki kekayaan alam dan budaya yang luar biasa.";

  return (
    <VillageOverviewClient
      heading={heading}
      stats={stats}
      sejarah={sejarah}
      galleryImages={galleryImages.length >= 3 ? galleryImages : defaultImages}
    />
  );
}
