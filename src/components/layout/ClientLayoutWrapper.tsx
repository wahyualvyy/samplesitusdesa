"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayoutWrapper({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar settings={settings} />
      <main className={`flex-grow ${!isHome ? "pt-24 lg:pt-28" : ""}`}>
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
