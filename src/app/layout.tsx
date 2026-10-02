import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { getSiteSettings } from "@/actions/profil";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Website Resmi Pemerintah ${settings?.siteName || 'Desa'}`,
    description: settings?.heroSubtitle || "Portal informasi, transparansi, pelayanan publik, dan potensi desa.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <ClientLayoutWrapper settings={settings}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
