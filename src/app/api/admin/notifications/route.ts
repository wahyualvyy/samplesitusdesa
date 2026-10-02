import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const recentNew = await prisma.complaint.findMany({
      where: { status: 'DITERIMA' },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, name: true, category: true, createdAt: true },
    });
    return NextResponse.json({
      items: recentNew,
      unread: recentNew.length,
    });
  } catch {
    return NextResponse.json({ items: [], unread: 0 });
  }
}
