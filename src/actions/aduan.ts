"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ===== COMPLAINTS =====
export async function getComplaintList(status?: string) {
  return await prisma.complaint.findMany({
    where: status && status !== 'SEMUA' ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { timelines: { orderBy: { createdAt: 'asc' } }, attachments: true },
  });
}

export async function getComplaint(id: string) {
  return await prisma.complaint.findUnique({
    where: { id },
    include: { timelines: { orderBy: { createdAt: 'asc' } }, attachments: true },
  });
}

export async function updateComplaintStatus(id: string, status: string, notes: string) {
  await requireAuth();
  await prisma.complaint.update({
    where: { id },
    data: { status, adminNote: notes, updatedAt: new Date() },
  });
  await prisma.complaintTimeline.create({
    data: { complaintId: id, status, notes },
  });
  revalidatePath("/admin/aduan");
  return { success: true };
}

export async function createComplaint(data: {
  name: string;
  nik?: string;
  email?: string;
  phone: string;
  category: string;
  title: string;
  content: string;
  location?: string;
}) {
  // Generate tracking ID: KRSK-YYYY-NNNNN
  const year = new Date().getFullYear();
  const count = await prisma.complaint.count();
  const trackingId = `KRSK-${year}-${String(count + 1).padStart(5, '0')}`;

  const complaint = await prisma.complaint.create({
    data: { ...data, trackingId, status: 'DITERIMA' },
  });
  await prisma.complaintTimeline.create({
    data: { complaintId: complaint.id, status: 'DITERIMA', notes: 'Aduan Anda telah diterima dan akan segera ditindaklanjuti.' },
  });
  revalidatePath("/admin/aduan");
  return { success: true, trackingId };
}

export async function deleteComplaint(id: string) {
  await requireAuth();
  await prisma.complaint.delete({ where: { id } });
  revalidatePath("/admin/aduan");
}

export async function getComplaintStats() {
  const [total, diterima, diproses, selesai, ditolak] = await Promise.all([
    prisma.complaint.count(),
    prisma.complaint.count({ where: { status: 'DITERIMA' } }),
    prisma.complaint.count({ where: { status: 'DIPROSES' } }),
    prisma.complaint.count({ where: { status: 'SELESAI' } }),
    prisma.complaint.count({ where: { status: 'DITOLAK' } }),
  ]);
  return { total, diterima, diproses, selesai, ditolak };
}
