"use client";

import SuratCard from "./SuratCard";

export default function SuratList({ templates }: { templates: any[] }) {
  if (!templates || templates.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-border">
        <p className="text-muted-foreground">Belum ada template surat yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((surat) => (
        <SuratCard key={surat.id} surat={surat} />
      ))}
    </div>
  );
}
