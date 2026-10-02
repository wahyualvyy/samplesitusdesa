"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getResidentList(filters?: { dusun?: string; gender?: string; status?: string }) {
  return await prisma.resident.findMany({
    where: {
      ...(filters?.dusun && filters.dusun !== 'Semua' ? { dusun: filters.dusun } : {}),
      ...(filters?.gender && filters.gender !== 'Semua' ? { gender: filters.gender } : {}),
      ...(filters?.status && filters.status !== 'Semua' ? { status: filters.status } : {}),
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getResident(id: string) {
  return await prisma.resident.findUnique({ where: { id } });
}

export async function deleteResident(id: string) {
  await requireAuth();
  await prisma.resident.delete({ where: { id } });
  revalidatePath("/admin/penduduk");
}

export async function saveResident(data: {
  id?: string | null;
  nik: string;
  nama: string;
  gender: string;
  dusun: string;
  status: string;
  usia: number | string;
  agama?: string;
  pendidikan?: string;
  pekerjaan?: string;
}) {
  await requireAuth();
  try {
    const payload = {
      nik: data.nik,
      nama: data.nama,
      gender: data.gender,
      dusun: data.dusun,
      status: data.status,
      usia: Number(data.usia) || 0,
      agama: data.agama || "Islam",
      pendidikan: data.pendidikan || "SMA/Sederajat",
      pekerjaan: data.pekerjaan || "Petani/Nelayan",
    };

    if (data.id && typeof data.id === 'string' && data.id.length > 10) {
      await prisma.resident.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.resident.create({ data: payload });
    }
    revalidatePath("/admin/penduduk");
    return { success: true };
  } catch (error) {
    console.error("Save Resident Error:", error);
    return { success: false, error: String(error) };
  }
}

export async function getResidentStats() {
  const [total, lakiLaki, perempuan, aktif, pindah, meninggal] = await Promise.all([
    prisma.resident.count(),
    prisma.resident.count({ where: { gender: "Laki-laki" } }),
    prisma.resident.count({ where: { gender: "Perempuan" } }),
    prisma.resident.count({ where: { status: "Aktif" } }),
    prisma.resident.count({ where: { status: "Pindah" } }),
    prisma.resident.count({ where: { status: "Meninggal" } }),
  ]);
  return { total, lakiLaki, perempuan, aktif, pindah, meninggal };
}

export async function getResidentDemographics() {
  const residents = await prisma.resident.findMany({
    select: { gender: true, usia: true, pendidikan: true, pekerjaan: true }
  });
  
  let totalPenduduk = residents.length;
  let lakiLaki = 0;
  let perempuan = 0;
  
  let age0_14 = 0;
  let age15_24 = 0;
  let age25_34 = 0;
  let age35_44 = 0;
  let age45_54 = 0;
  let age55_plus = 0;
  
  const educationMap: Record<string, number> = {};
  const jobMap: Record<string, number> = {};
  
  residents.forEach(r => {
    if (r.gender === "Laki-laki") lakiLaki++;
    if (r.gender === "Perempuan") perempuan++;
    
    if (r.usia >= 0 && r.usia <= 14) age0_14++;
    else if (r.usia >= 15 && r.usia <= 24) age15_24++;
    else if (r.usia >= 25 && r.usia <= 34) age25_34++;
    else if (r.usia >= 35 && r.usia <= 44) age35_44++;
    else if (r.usia >= 45 && r.usia <= 54) age45_54++;
    else if (r.usia >= 55) age55_plus++;
    
    const pend = r.pendidikan || "Belum Terdata";
    educationMap[pend] = (educationMap[pend] || 0) + 1;
    
    const pek = r.pekerjaan || "Belum Terdata";
    jobMap[pek] = (jobMap[pek] || 0) + 1;
  });
  
  const educationDistribution = Object.entries(educationMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
    
  const jobDistribution = Object.entries(jobMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  
  const popStat = await prisma.populationStatistic.findFirst({ orderBy: { year: 'desc' } });
  
  const finalTotalPenduduk = popStat?.totalPenduduk || totalPenduduk;
  const finalLakiLaki = popStat?.lakiLaki || lakiLaki;
  const finalPerempuan = popStat?.perempuan || perempuan;
  const finalKepalaKeluarga = popStat?.kepalaKeluarga || Math.floor(finalTotalPenduduk / 4);
  
  return {
    year: popStat?.year || new Date().getFullYear(),
    totalPenduduk: finalTotalPenduduk,
    lakiLaki: finalLakiLaki,
    perempuan: finalPerempuan,
    kepalaKeluarga: finalKepalaKeluarga,
    ageDistribution: [
      { age: "0-14", jumlah: age0_14 },
      { age: "15-24", jumlah: age15_24 },
      { age: "25-34", jumlah: age25_34 },
      { age: "35-44", jumlah: age35_44 },
      { age: "45-54", jumlah: age45_54 },
      { age: "55+", jumlah: age55_plus },
    ],
    educationDistribution,
    jobDistribution
  };
}
