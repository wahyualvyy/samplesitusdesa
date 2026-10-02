"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDocumentTemplates(activeOnly = false) {
  return await prisma.documentTemplate.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { createdAt: "desc" }
  });
}

export async function getDocumentTemplate(id: string) {
  return await prisma.documentTemplate.findUnique({
    where: { id }
  });
}

export async function createDocumentTemplate(data: {
  name: string;
  slug: string;
  description?: string;
  content: string;
  isActive?: boolean;
}) {
  await requireAuth();
  await prisma.documentTemplate.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      content: data.content,
      isActive: data.isActive ?? true,
    }
  });
  revalidatePath("/admin/informasi/surat");
  revalidatePath("/informasi/surat");
}

export async function updateDocumentTemplate(id: string, data: {
  name: string;
  slug: string;
  description?: string;
  content: string;
  isActive?: boolean;
}) {
  await requireAuth();
  await prisma.documentTemplate.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      content: data.content,
      isActive: data.isActive,
    }
  });
  revalidatePath("/admin/informasi/surat");
  revalidatePath("/informasi/surat");
}

export async function deleteDocumentTemplate(id: string) {
  await requireAuth();
  await prisma.documentTemplate.delete({
    where: { id }
  });
  revalidatePath("/admin/informasi/surat");
  revalidatePath("/informasi/surat");
}
