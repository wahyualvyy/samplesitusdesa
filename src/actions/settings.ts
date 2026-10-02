"use server";

import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSiteSettingsForHero() {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { id: '1' } });
    return settings;
  } catch {
    return null;
  }
}
