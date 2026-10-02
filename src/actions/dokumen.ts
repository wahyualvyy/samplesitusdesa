"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ===== DOCUMENTS =====
export async function getDocumentList() {
  return await prisma.document.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function saveDocument(data: {
  id?: string;
  title: string;
  year: number;
  category: string;
  fileUrl: string;
  fileSize: string;
}) {
  await requireAuth();
  if (data.id) {
    await prisma.document.update({
      where: { id: data.id },
      data: { title: data.title, year: data.year, category: data.category, fileUrl: data.fileUrl, fileSize: data.fileSize },
    });
  } else {
    await prisma.document.create({
      data: { title: data.title, year: data.year, category: data.category, fileUrl: data.fileUrl, fileSize: data.fileSize, downloads: 0 },
    });
  }
  revalidatePath("/dokumen");
  revalidatePath("/admin/dokumen");
  return { success: true };
}

export async function deleteDocument(id: string) {
  await requireAuth();
  await prisma.document.delete({ where: { id } });
  revalidatePath("/dokumen");
  revalidatePath("/admin/dokumen");
}

// ===== PPID DOCUMENTS =====
export async function getPPIDDocumentList() {
  return await prisma.pPIDDocument.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function savePPIDDocument(data: {
  id?: string;
  title: string;
  category: string;
  year: number;
  fileUrl: string;
  fileSize: string;
}) {
  await requireAuth();
  if (data.id) {
    await prisma.pPIDDocument.update({
      where: { id: data.id },
      data: { title: data.title, category: data.category, year: data.year, fileUrl: data.fileUrl, fileSize: data.fileSize },
    });
  } else {
    await prisma.pPIDDocument.create({
      data: { title: data.title, category: data.category, year: data.year, fileUrl: data.fileUrl, fileSize: data.fileSize },
    });
  }
  revalidatePath("/layanan/ppid");
  revalidatePath("/admin/dokumen");
  return { success: true };
}

export async function deletePPIDDocument(id: string) {
  await requireAuth();
  await prisma.pPIDDocument.delete({ where: { id } });
  revalidatePath("/layanan/ppid");
  revalidatePath("/admin/dokumen");
}
