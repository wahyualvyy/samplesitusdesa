"use client";

import { useState } from "react";
import { X, Save, RefreshCw } from "lucide-react";
import { createDocumentTemplate, updateDocumentTemplate } from "@/actions/document-template";
import TemplateEditor from "./TemplateEditor";

export default function SuratForm({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: any | null;
}) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || '{"header":"","title":"","body":"","footer":""}',
    isActive: initialData ? initialData.isActive : true,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    try {
      if (initialData?.id) {
        await updateDocumentTemplate(initialData.id, formData);
      } else {
        await createDocumentTemplate(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsPending(false);
    }
  };

  const inputClass = "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Template Surat" : "Tambah Template Surat"}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="surat-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Nama Surat *</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Contoh: Surat Keterangan Domisili"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Slug (URL friendly) *</label>
                <input 
                  required
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className={inputClass}
                  placeholder="contoh: surat-keterangan-domisili"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-2">Deskripsi Singkat</label>
              <textarea 
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClass}
                placeholder="Penjelasan singkat kegunaan surat ini..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-bold text-gray-700">Status Aktif (Ditampilkan di Publik)</span>
              </label>
            </div>

            <hr className="border-gray-100" />
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Editor Isi Template</h3>
              <TemplateEditor 
                value={formData.content} 
                onChange={(val) => setFormData({ ...formData, content: val })} 
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit"
            form="surat-form"
            disabled={isPending}
            className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors flex items-center disabled:opacity-70"
          >
            {isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Simpan Template
          </button>
        </div>

      </div>
    </div>
  );
}
