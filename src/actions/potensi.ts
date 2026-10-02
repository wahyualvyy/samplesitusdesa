'use server';

import { requireAuth } from "@/lib/auth";

import prisma from '@/lib/prisma'

export async function getUmkmList() {
  try {
    return await prisma.uMKM.findMany({
      orderBy: { id: 'desc' }
    })
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    return []
  }
}

export async function getTourismList() {
  try {
    return await prisma.tourism.findMany({
      orderBy: { id: 'desc' }
    })
  } catch (error) {
    console.error("Error fetching Tourism:", error)
    return []
  }
}

export async function deleteUmkm(id: string) {
  await requireAuth();
  try {
    await prisma.uMKM.delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export async function deleteTourism(id: string) {
  await requireAuth();
  try {
    await prisma.tourism.delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export async function saveUmkm(data: any) {
  await requireAuth();
  try {
    if (data.id && typeof data.id === 'string' && data.id.length > 10) {
      await prisma.uMKM.update({
        where: { id: data.id },
        data: {
          name: data.nama,
          category: data.kategori,
          ownerName: data.pemilik,
          description: data.deskripsi || "UMKM Warga",
          phone: data.kontak,
          image: data.image
        }
      });
    } else {
      await prisma.uMKM.create({
        data: {
          name: data.nama,
          category: data.kategori,
          ownerName: data.pemilik,
          description: data.deskripsi || "UMKM Warga",
          phone: data.kontak,
          image: data.image || "https://picsum.photos/seed/umkm/400/300"
        }
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Save UMKM Error:", error);
    return { success: false, error };
  }
}

export async function saveTourism(data: any) {
  await requireAuth();
  try {
    if (data.id && typeof data.id === 'string' && data.id.length > 10) {
      await prisma.tourism.update({
        where: { id: data.id },
        data: {
          name: data.nama,
          description: data.deskripsi || "Wisata Desa",
          location: data.alamat || "Desa Contoh",
          image: data.image
        }
      });
    } else {
      await prisma.tourism.create({
        data: {
          name: data.nama,
          description: data.deskripsi || "Wisata Desa",
          location: data.alamat || "Desa Contoh",
          image: data.image || "https://picsum.photos/seed/wisata/400/300"
        }
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Save Tourism Error:", error);
    return { success: false, error };
  }
}
