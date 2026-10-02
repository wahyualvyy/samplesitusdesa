"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPopulationStatistic() {
  try {
    return await prisma.populationStatistic.findFirst({
      orderBy: { year: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching population statistics:", error);
    return null;
  }
}

export async function getApbdesList() {
  try {
    return await prisma.aPBDes.findMany({
      include: { categories: true },
      orderBy: { year: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching apbdes:", error);
    return [];
  }
}

// ===== SAVE POPULATION STATISTIC =====
export async function savePopulationStatistic(data: {
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
    create: data,
  });
  revalidatePath("/data-desa/statistik");
  revalidatePath("/admin/penduduk");
  return { success: true };
}

export async function deletePopulationStatistic(year: number) {
  await requireAuth();
  await prisma.populationStatistic.delete({ where: { year } });
  revalidatePath("/data-desa/statistik");
  revalidatePath("/admin/penduduk");
}

// ===== DASHBOARD AGGREGATE STATS =====
export async function getDashboardStats() {
  const [
    realTotalPenduduk,
    realLakiLaki,
    realPerempuan,
    totalBerita,
    totalAduan,
    aduanBaru,
    aduanDiproses,
    totalUmkm,
    totalWisata,
    apbdes,
    latestComplaints,
    popStat
  ] = await Promise.all([
    prisma.resident.count(),
    prisma.resident.count({ where: { gender: "Laki-laki" } }),
    prisma.resident.count({ where: { gender: "Perempuan" } }),
    prisma.news.count({ where: { isPublished: true } }),
    prisma.complaint.count(),
    prisma.complaint.count({ where: { status: 'DITERIMA' } }),
    prisma.complaint.count({ where: { status: 'DIPROSES' } }),
    prisma.uMKM.count(),
    prisma.tourism.count(),
    prisma.aPBDes.findFirst({
      orderBy: { year: 'desc' },
      include: { categories: true }
    }),
    prisma.complaint.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.populationStatistic.findFirst({ orderBy: { year: 'desc' } })
  ]);

  // Compute APBDes serapan
  let serapanPersen = 0;
  if (apbdes) {
    const totalRealisasi = apbdes.categories
      .filter(c => c.type === 'BELANJA')
      .reduce((sum, c) => sum + c.realisasi, 0);
    serapanPersen = apbdes.belanja > 0
      ? Math.round((totalRealisasi / apbdes.belanja) * 100)
      : 0;
  }

  return {
    totalPenduduk: popStat?.totalPenduduk || realTotalPenduduk,
    lakiLaki: popStat?.lakiLaki || realLakiLaki,
    perempuan: popStat?.perempuan || realPerempuan,
    kepalaKeluarga: popStat?.kepalaKeluarga || Math.floor((popStat?.totalPenduduk || realTotalPenduduk) / 4),
    totalBerita,
    totalAduan,
    aduanBaru,
    aduanDiproses,
    totalUmkm,
    totalWisata,
    apbdes,
    serapanPersen,
    latestComplaints,
  };
}
