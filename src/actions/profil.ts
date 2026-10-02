"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ===== SITE SETTINGS =====
export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: '1' } });
  return settings;
}

export async function saveSiteSettings(data: {
  siteName?: string;
  tagline?: string;
  address?: string;
  email?: string;
  phone?: string;
  postalCode?: string;
  officeHours?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackground?: string;
  kecamatan?: string;
  kabupaten?: string;
  provinsi?: string;
  jamPelayanan?: string;
}) {
  await requireAuth();
  await prisma.siteSetting.upsert({
    where: { id: '1' },
    update: data,
    create: {
      id: '1',
      siteName: data.siteName || 'Desa Contoh',
      tagline: data.tagline || 'Pemerintah Desa',
      address: data.address || '',
      email: data.email || '',
      phone: data.phone || '',
      postalCode: data.postalCode || '',
      officeHours: data.officeHours || '',
      heroTitle: data.heroTitle || 'Selamat Datang di',
      heroSubtitle: data.heroSubtitle || '',
      heroBackground: data.heroBackground || '',
      kecamatan: data.kecamatan || '',
      kabupaten: data.kabupaten || '',
      provinsi: data.provinsi || '',
      jamPelayanan: data.jamPelayanan || '',
    }
  });
  revalidatePath("/");
  revalidatePath("/admin/profil");
  return { success: true };
}

// ===== VILLAGE PROFILE =====
export async function getVillageProfile() {
  const profile = await prisma.villageProfile.findUnique({ where: { id: '1' } });
  return profile;
}

export async function saveVillageProfile(data: {
  profilSingkat?: string;
  luasWilayah?: string;
  jumlahDusun?: string;
  koordinatLat?: string;
  koordinatLng?: string;
  sejarah?: string;
  sejarahImage?: string;
  visi?: string;
  misi?: string;
  timeline?: string; // JSON string
  bpdInfo?: string;
}) {
  await requireAuth();
  await prisma.villageProfile.upsert({
    where: { id: '1' },
    update: data,
    create: { id: '1', ...data },
  });
  revalidatePath("/profil");
  revalidatePath("/profil/sejarah");
  revalidatePath("/profil/visi-misi");
  revalidatePath("/admin/profil");
  return { success: true };
}

// ===== VILLAGE OFFICIALS =====
export async function getVillageOfficials(type: string = "PEMDES") {
  return await prisma.villageOfficial.findMany({ 
    where: { type },
    orderBy: { order: 'asc' } 
  });
}

export async function saveVillageOfficial(data: {
  id?: string;
  name: string;
  position: string;
  description?: string;
  image?: string;
  order?: number;
  type?: string;
}) {
  await requireAuth();
  if (data.id) {
    await prisma.villageOfficial.update({
      where: { id: data.id },
      data: {
        name: data.name,
        position: data.position,
        description: data.description,
        image: data.image,
        order: data.order || 0,
        type: data.type || "PEMDES",
      }
    });
  } else {
    await prisma.villageOfficial.create({
      data: {
        name: data.name,
        position: data.position,
        description: data.description || '',
        image: data.image || '',
        order: data.order || 0,
        type: data.type || "PEMDES",
      }
    });
  }
  revalidatePath("/profil/pemerintahan");
  revalidatePath("/admin/profil");
  return { success: true };
}

export async function deleteVillageOfficial(id: string) {
  await requireAuth();
  await prisma.villageOfficial.delete({ where: { id } });
  revalidatePath("/profil/pemerintahan");
  revalidatePath("/admin/profil");
}

// ===== POPULATION STATISTICS =====
export async function getPopulationStats() {
  return await prisma.populationStatistic.findMany({ orderBy: { year: 'desc' } });
}

export async function savePopulationStat(data: {
  id?: string;
  year: number;
  totalPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  kepalaKeluarga: number;
  pendudukSementara: number;
  mutasi: number;
}) {
  await requireAuth();
  await prisma.populationStatistic.upsert({
    where: { year: data.year },
    update: {
      totalPenduduk: data.totalPenduduk,
      lakiLaki: data.lakiLaki,
      perempuan: data.perempuan,
      kepalaKeluarga: data.kepalaKeluarga,
      pendudukSementara: data.pendudukSementara,
      mutasi: data.mutasi,
    },
    create: {
      year: data.year,
      totalPenduduk: data.totalPenduduk,
      lakiLaki: data.lakiLaki,
      perempuan: data.perempuan,
      kepalaKeluarga: data.kepalaKeluarga,
      pendudukSementara: data.pendudukSementara,
      mutasi: data.mutasi,
    }
  });
  revalidatePath("/data-desa/statistik");
  revalidatePath("/admin/profil");
  return { success: true };
}
