"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ambil satu section berdasarkan page+section key
export async function getPageSection(page: string, section: string) {
  const s = await prisma.pageSection.findUnique({
    where: { page_section: { page, section } },
  });
  return s;
}

// Ambil semua section untuk satu halaman, terurut
export async function getPageSectionsByPage(page: string) {
  return await prisma.pageSection.findMany({
    where: { page, isVisible: true },
    orderBy: { order: "asc" },
  });
}

// Buat atau update section
export async function upsertPageSection(data: {
  page: string;
  section: string;
  content: Record<string, unknown>;
  isVisible?: boolean;
  order?: number;
}) {
  await requireAuth();
  const contentStr = JSON.stringify(data.content);
  const result = await prisma.pageSection.upsert({
    where: { page_section: { page: data.page, section: data.section } },
    update: {
      content: contentStr,
      isVisible: data.isVisible ?? true,
      order: data.order ?? 0,
    },
    create: {
      page: data.page,
      section: data.section,
      content: contentStr,
      isVisible: data.isVisible ?? true,
      order: data.order ?? 0,
    },
  });
  revalidatePath("/");
  revalidatePath(`/admin/beranda`);
  return result;
}

// Toggle visibility section
export async function toggleSectionVisibility(id: string, isVisible: boolean) {
  await requireAuth();
  await prisma.pageSection.update({
    where: { id },
    data: { isVisible },
  });
  revalidatePath("/");
}
