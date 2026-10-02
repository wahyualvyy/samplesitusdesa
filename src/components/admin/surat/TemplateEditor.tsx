"use client";

export default function TemplateEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  let parsed = { header: "", title: "", body: "", footer: "" };
  try {
    parsed = JSON.parse(value);
  } catch (e) {
    // ignore
  }

  const handleChange = (key: string, val: string) => {
    const newVal = { ...parsed, [key]: val };
    onChange(JSON.stringify(newVal));
  };

  const inputClass = "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-bold text-gray-700 block mb-2">Kop Surat (Header)</label>
        <textarea 
          rows={3} 
          className={inputClass}
          value={parsed.header || ""}
          onChange={(e) => handleChange("header", e.target.value)}
          placeholder="PEMERINTAH KABUPATEN SIDOARJO&#10;KECAMATAN WONOAYU&#10;DESA SIMOKETAWANG"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700 block mb-2">Judul Surat</label>
        <input 
          type="text" 
          className={inputClass}
          value={parsed.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="SURAT KETERANGAN DOMISILI"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700 block mb-2">Isi Surat (Body)</label>
        <textarea 
          rows={6} 
          className={inputClass}
          value={parsed.body || ""}
          onChange={(e) => handleChange("body", e.target.value)}
          placeholder="Yang bertanda tangan di bawah ini menerangkan bahwa..."
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700 block mb-2">Penandatangan (Footer)</label>
        <textarea 
          rows={2} 
          className={inputClass}
          value={parsed.footer || ""}
          onChange={(e) => handleChange("footer", e.target.value)}
          placeholder="Kepala Desa Simoketawang"
        />
      </div>
    </div>
  );
}
