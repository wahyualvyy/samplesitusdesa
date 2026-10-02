"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBeritaList() {
  return await prisma.news.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { category: true } 
  });
}

export async function getBerita(idOrSlug: string) {
  return await prisma.news.findFirst({ 
    where: { 
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug }
      ]
    },
    include: {
      category: true,
      author: true
    }
  });
}

export async function getPengumumanList() {
  return await prisma.announcement.findMany({ orderBy: { date: 'desc' } });
}

export async function getPengumuman(id: string) {
  return await prisma.announcement.findUnique({ where: { id } });
}

export async function getGaleriList() {
  return await prisma.galleryImage.findMany({ orderBy: { id: 'desc' } });
}

export async function getGaleri(id: string) {
  return await prisma.galleryImage.findUnique({ where: { id } });
}

export async function deleteBerita(id: string) {
  await requireAuth();
  await prisma.news.delete({ where: { id } });
  revalidatePath("/admin/berita");
}

export async function deletePengumuman(id: string) {
  await requireAuth();
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/berita");
}

export async function deleteGaleri(id: string) {
  await requireAuth();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/berita");
}

export async function saveBerita(data: any) {
  await requireAuth();
  // Find default user and category
  const defaultUser = await prisma.user.findFirst();
  let defaultCategory = await prisma.newsCategory.findFirst();
  if (!defaultCategory) {
    defaultCategory = await prisma.newsCategory.create({
      data: { name: "Umum", slug: "umum" }
    });
  }

  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  if (data.id && typeof data.id === 'string' && data.id.length > 10) {
    await prisma.news.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        isPublished: data.status === "Terbit",
        image: data.image
      }
    });
  } else {
    await prisma.news.create({
      data: {
        title: data.title,
        slug: slug,
        content: data.content,
        isPublished: data.status === "Terbit",
        image: data.image || "https://picsum.photos/seed/news/800/600",
        authorId: defaultUser?.id || "",
        categoryId: defaultCategory.id
      }
    });
  }
  revalidatePath("/admin/berita");
  revalidatePath("/");
}

export async function savePengumuman(data: any) {
  await requireAuth();
  if (data.id && typeof data.id === 'string' && data.id.length > 10) {
    await prisma.announcement.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        status: data.priority,
      }
    });
  } else {
    await prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.priority,
        date: new Date()
      }
    });
  }
  revalidatePath("/admin/berita");
  revalidatePath("/");
}

export async function saveGaleri(data: any) {
  await requireAuth();
  if (data.id && typeof data.id === 'string' && data.id.length > 10) {
    await prisma.galleryImage.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category || "Kegiatan",
        imageUrl: data.image
      }
    });
  } else {
    await prisma.galleryImage.create({
      data: {
        title: data.title,
        category: data.category || "Kegiatan",
        imageUrl: data.image || "https://picsum.photos/seed/gallery/800/800"
      }
    });
  }
  revalidatePath("/admin/berita");
  revalidatePath("/");
}
