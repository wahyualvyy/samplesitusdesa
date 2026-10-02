"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVillageServices() {
  return await prisma.villageService.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllVillageServices() {
  return await prisma.villageService.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getVillageService(id: string) {
  return await prisma.villageService.findUnique({ where: { id } });
}

export async function saveVillageService(data: {
  id?: string | null;
  title: string;
  description: string;
  href: string;
  icon?: string;
  color?: string;
  isVisible?: boolean;
  order?: number;
}) {
  await requireAuth();
  if (data.id && data.id.length > 10) {
    await prisma.villageService.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        href: data.href,
        icon: data.icon || "LayoutGrid",
        color: data.color || "bg-blue-50 text-blue-600 border-blue-100",
        isVisible: data.isVisible ?? true,
        order: Number(data.order) || 0,
      },
    });
  } else {
    await prisma.villageService.create({
      data: {
        title: data.title,
        description: data.description,
        href: data.href,
        icon: data.icon || "LayoutGrid",
        color: data.color || "bg-blue-50 text-blue-600 border-blue-100",
        isVisible: data.isVisible ?? true,
        order: Number(data.order) || 0,
      },
    });
  }
  revalidatePath("/");
  revalidatePath("/layanan");
  revalidatePath("/admin/layanan");
  return { success: true };
}

export async function deleteVillageService(id: string) {
  await requireAuth();
  await prisma.villageService.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/layanan");
  revalidatePath("/admin/layanan");
}

export async function toggleVillageService(id: string, isVisible: boolean) {
  await requireAuth();
  await prisma.villageService.update({ where: { id }, data: { isVisible } });
  revalidatePath("/");
  revalidatePath("/layanan");
}
