"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get list of APBDes years with categories
export async function getApbdesList() {
  return await prisma.aPBDes.findMany({
    include: { categories: { orderBy: { type: 'asc' } } },
    orderBy: { year: 'desc' },
  });
}

// Get a single APBDes year
export async function getApbdesYear(year: number) {
  return await prisma.aPBDes.findUnique({
    where: { year },
    include: { categories: true },
  });
}

// Get APBDesCategory list (for admin table)
export async function getApbdesCategoryList() {
  return await prisma.aPBDesCategory.findMany({
    include: { apbDes: true },
    orderBy: [{ apbDes: { year: 'desc' } }, { type: 'asc' }],
  });
}

// Get a single category
export async function getApbdesCategory(id: string) {
  return await prisma.aPBDesCategory.findUnique({ where: { id }, include: { apbDes: true } });
}

// Delete a category
export async function deleteApbdesCategory(id: string) {
  await requireAuth();
  const cat = await prisma.aPBDesCategory.findUnique({ where: { id }, include: { apbDes: true } });
  if (!cat) return;
  await prisma.aPBDesCategory.delete({ where: { id } });
  // Recalculate parent totals
  await recalcApbdesTotals(cat.apbDes.year);
  revalidatePath("/admin/apbdes");
  revalidatePath("/data-desa/apb-desa");
}

// Delete an entire APBDes year
export async function deleteApbdesYear(id: string) {
  await requireAuth();
  await prisma.aPBDes.delete({ where: { id } });
  revalidatePath("/admin/apbdes");
  revalidatePath("/data-desa/apb-desa");
}

// Recalculate totals for APBDes parent record
async function recalcApbdesTotals(year: number) {
  const categories = await prisma.aPBDesCategory.findMany({
    where: { apbDes: { year } },
  });
  const pendapatan = categories.filter(c => c.type === 'PENDAPATAN').reduce((s, c) => s + c.amount, 0);
  const belanja = categories.filter(c => c.type === 'BELANJA').reduce((s, c) => s + c.amount, 0);
  const pembiayaan = categories.filter(c => c.type === 'PEMBIAYAAN').reduce((s, c) => s + c.amount, 0);
  await prisma.aPBDes.update({ where: { year }, data: { pendapatan, belanja, pembiayaan } });
}

// Save (create or update) a category
export async function saveApbdesCategory(data: {
  id?: string;
  year: number;
  type: string;   // PENDAPATAN | BELANJA | PEMBIAYAAN
  name: string;
  amount: number;
  realisasi: number;
}) {
  await requireAuth();
  // Ensure APBDes year exists
  let main = await prisma.aPBDes.findUnique({ where: { year: data.year } });
  if (!main) {
    main = await prisma.aPBDes.create({
      data: { year: data.year, pendapatan: 0, belanja: 0, pembiayaan: 0 }
    });
  }

  const progress = data.amount > 0 ? (data.realisasi / data.amount) * 100 : 0;

  if (data.id) {
    await prisma.aPBDesCategory.update({
      where: { id: data.id },
      data: {
        type: data.type,
        name: data.name,
        amount: data.amount,
        realisasi: data.realisasi,
        progress,
      }
    });
  } else {
    await prisma.aPBDesCategory.create({
      data: {
        apbDesId: main.id,
        type: data.type,
        name: data.name,
        amount: data.amount,
        realisasi: data.realisasi,
        progress,
      }
    });
  }
  // Recalculate parent totals
  await recalcApbdesTotals(data.year);

  revalidatePath("/admin/apbdes");
  revalidatePath("/data-desa/apb-desa");
  revalidatePath("/");
  return { success: true };
}

// Legacy alias for older code
export async function saveApbdes(data: any) {
  await requireAuth();
  return await saveApbdesCategory({
    id: data.id && data.id.length > 10 ? data.id : undefined,
    year: data.year || 2026,
    type: data.kategori === 'Pendapatan' ? 'PENDAPATAN' : data.kategori === 'Belanja' ? 'BELANJA' : 'PEMBIAYAAN',
    name: data.uraian,
    amount: Number(data.anggaran) || 0,
    realisasi: Number(data.realisasi) || 0,
  });
}

// Legacy alias
export async function deleteApbdes(id: string) {
  await requireAuth();
  return await deleteApbdesCategory(id);
}
