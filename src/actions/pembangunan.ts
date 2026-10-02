"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.developmentProject.findMany({ orderBy: { year: 'desc' } });
}

export async function saveProject(data: any) {
  await requireAuth();
  if (data.id && typeof data.id === 'string' && data.id.length > 15) {
    // Has a valid CUID
    await prisma.developmentProject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        location: data.location,
        budget: Number(data.budget),
        fundingSource: data.fundingSource,
        year: Number(data.year),
        progress: Number(data.progress),
        status: data.status,
      }
    });
  } else {
    // New project
    await prisma.developmentProject.create({
      data: {
        name: data.name,
        location: data.location,
        budget: Number(data.budget),
        fundingSource: data.fundingSource,
        year: Number(data.year),
        progress: Number(data.progress),
        status: data.status,
      }
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/beranda");
}

export async function deleteProjectAction(id: string) {
  await requireAuth();
  await prisma.developmentProject.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/beranda");
}
