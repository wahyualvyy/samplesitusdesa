"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, FileText, CheckCircle2, XCircle, Eye } from "lucide-react";
import SuratForm from "@/components/admin/surat/SuratForm";
import SuratPreview from "@/components/admin/surat/SuratPreview";
import { getDocumentTemplates, deleteDocumentTemplate } from "@/actions/document-template";

export default function AdminSuratPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState<any | null>(null);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await getDocumentTemplates();
      setTemplates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [isFormOpen]); // Refresh when form closes

  const handleEdit = (surat: any) => {
    setSelectedSurat(surat);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedSurat(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus template ini?")) {
      try {
        await deleteDocumentTemplate(id);
        fetchTemplates();
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus template.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Template Surat Desa</h1>
          <p className="text-muted-foreground mt-1">Atur dokumen administrasi yang dapat diunduh oleh warga.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Template</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Memuat data template...</div>
        ) : templates.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <FileText className="w-12 h-12 mb-4 text-gray-300" />
            <p>Belum ada template surat. Silakan tambah baru.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Surat</th>
                  <th className="px-6 py-4 font-semibold">Slug URL</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {templates.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded font-mono">
                        {item.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          <XCircle className="w-3.5 h-3.5 mr-1" /> Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setSelectedSurat(item);
                            setIsPreviewOpen(true);
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Lihat Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Template"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SuratForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedSurat}
      />

      <SuratPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        surat={selectedSurat}
      />
    </div>
  );
}
