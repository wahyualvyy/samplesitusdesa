"use server";

import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function login(email: string, pass: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: "Email atau password salah." };
    }

    const isValid = await bcrypt.compare(pass, user.password);
    
    // Fallback if password is not hashed yet (e.g., from seed)
    if (!isValid && pass !== user.password) {
      return { success: false, error: "Email atau password salah." };
    }
    
    // If fallback worked, we should ideally hash it and save it.
    if (!isValid && pass === user.password) {
      const hashed = await bcrypt.hash(pass, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed }
      });
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const sessionData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
    
    const session = await encrypt(sessionData);

    (await cookies()).set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}

export async function logout() {
  (await cookies()).delete("session");
  return { success: true };
}
