"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Save, Send, Image as ImageIcon, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, Link as LinkIcon, Paperclip, Plus,
  Eye, XCircle, Calendar, Tag, FileText
} from "lucide-react";

import { useRouter } from "next/navigation";
import { saveBerita, savePengumuman, saveGaleri, getBerita, getPengumuman, getGaleri } from "@/actions/berita";
import ImageUpload from "@/components/ui/ImageUpload";

const beritaCategories = [
  "Pembangunan", 
  "Sosial", 
  "Pemberdayaan", 
  "Kegiatan", 
  "Ekonomi",
  "Informasi Umum"
];

const pengumumanCategories = [
  "Infrastruktur",
  "Kesehatan",
  "Pendidikan",
  "Pelayanan Publik",
  "Peringatan Dini",
  "Umum"
];

const galeriCategories = [
  "Pemerintahan",
  "Pertanian",
  "Wisata",
  "Sosial",
  "Ekonomi",
  "Kesehatan",
  "Olahraga",
  "Infrastruktur",
  "Pembangunan"
];

export default function CreateBeritaPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draf");
  const [categories, setCategories] = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [docType, setDocType] = useState<"berita" | "pengumuman" | "galeri">("berita");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [priority, setPriority] = useState("Penting");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlEditId = searchParams.get("id");
    const typeParam = searchParams.get("type");
    const currentType = typeParam === "pengumuman" ? "pengumuman" : typeParam === "galeri" ? "galeri" : "berita";
    setDocType(currentType);

    if (urlEditId) {
      setEditId(urlEditId);
      setIsEditing(true);

      const fetchExisting = async () => {
        if (currentType === "berita") {
          const article = await getBerita(urlEditId);
          if (article) {
            setTitle(article.title);
            setContent(article.content);
            setStatus(article.isPublished ? "Terbit" : "Draf");
            setPublishDate(article.createdAt.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }));
            // Note: category is relation, ignoring for simple mock
            if (article.image) setImagePreview(article.image);
          }
        } else if (currentType === "pengumuman") {
          const article = await getPengumuman(urlEditId);
          if (article) {
            setTitle(article.title);
            setContent(article.content);
            setPriority(article.status);
            setPublishDate(article.date.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }));
            setCategories([]);
          }
        } else {
          const article = await getGaleri(urlEditId);
          if (article) {
            setTitle(article.title || "");
            if (article.imageUrl) setImagePreview(article.imageUrl);
          }
        }
      };

      fetchExisting();
    }
  }, []);

  const handleCategoryToggle = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([cat]); // Allow single category for now
    }
  };

  // Handled by ImageUpload component

  const handleSave = async (publishStatus: string) => {
    const data = {
      id: editId,
      title: title || "Berita Tanpa Judul",
      category: categories.length > 0 ? categories[0] : "Informasi Umum",
      status: docType === "pengumuman" ? undefined : publishStatus,
      priority: priority,
      content: content,
      image: imagePreview || null
    };

    if (docType === "berita") {
      await saveBerita(data);
    } else if (docType === "pengumuman") {
      await savePengumuman(data);
    } else {
      await saveGaleri(data);
    }

    router.push("/admin/berita");
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 relative">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <Link href="/admin/berita" className="p-2 bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-heading">
              {isEditing ? `Edit ${docType === "berita" ? "Berita" : docType === "pengumuman" ? "Pengumuman" : "Galeri"}` : docType === "galeri" ? "Unggah Galeri Baru" : `Tulis ${docType === "berita" ? "Berita" : "Pengumuman"} Baru`}
            </h1>
            <p className="text-xs text-gray-500">
              {isEditing ? "Mengedit publikasi yang sudah ada" : "Draft tersimpan otomatis"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto pb-1 md:pb-0">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button onClick={() => handleSave(isEditing ? status : "Draf")} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? "Simpan Perubahan" : "Simpan Draft"}
          </button>
          {docType === "berita" && (
            <button onClick={() => handleSave("Terbit")} className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 whitespace-nowrap">
              <Send className="w-4 h-4 mr-2" />
              {isEditing ? "Perbarui & Terbitkan" : "Terbitkan Berita"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            
            {/* Title Input */}
            <div className="mb-6">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={docType === "galeri" ? "Masukkan Judul atau Keterangan Gambar..." : `Masukkan Judul ${docType === "berita" ? "Berita" : "Pengumuman"}...`}
                className="w-full text-2xl md:text-3xl font-bold font-heading text-gray-900 border-none focus:ring-0 placeholder:text-gray-300 px-0 bg-transparent"
              />
              <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent mt-2"></div>
            </div>

            {/* WYSIWYG Editor Mockup (Hidden for Galeri) */}
            {docType !== "galeri" && (
            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              
              {/* Toolbar */}
              <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap items-center gap-1">
                <div className="flex items-center space-x-1 border-r border-gray-200 pr-2 mr-1">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Bold className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Italic className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Underline className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center space-x-1 border-r border-gray-200 pr-2 mr-1">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignLeft className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignCenter className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignRight className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center space-x-1 border-r border-gray-200 pr-2 mr-1">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><List className="w-4 h-4" /></button>
                </div>

                <div className="flex items-center space-x-1">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><ImageIcon className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Paperclip className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Text Area */}
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan isi berita Anda di sini..."
                className="w-full min-h-[400px] p-4 resize-y border-none focus:ring-0 text-gray-700 bg-white outline-none"
              />
            </div>
            )}
            
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          
          {/* Status & Visibility */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Pengaturan Publikasi</h3>
            
            <div className="space-y-4">
              {docType === "berita" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                >
                  <option value="Draf">Draf</option>
                  <option value="Menunggu Review">Menunggu Review</option>
                  <option value="Terbit">Terbit</option>
                </select>
              </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Terbit</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    placeholder="Otomatis"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-gray-600"
                    disabled
                  />
                </div>
              </div>

              {docType === "pengumuman" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sifat / Prioritas</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option value="Penting">Penting (Indikator Merah)</option>
                    <option value="Rutin">Rutin (Indikator Biru)</option>
                    <option value="Biasa">Biasa / Selesai (Indikator Abu-abu)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          {docType === "berita" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Kategori</h3>
            
            <div className="space-y-2">
              {beritaCategories.map(cat => (
                <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={categories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="rounded text-primary focus:ring-primary border-gray-300 w-4 h-4" 
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          )}

          {/* Featured Image or PDF */}
          {docType === "berita" || docType === "galeri" ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Gambar Utama (Thumbnail)</h3>
              
              <ImageUpload 
                value={imagePreview || ""} 
                onChange={(url) => setImagePreview(url)} 
                label="Pilih Gambar"
              />
            </div>
          ) : null}

        </div>
      </div>
      
      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-sm font-bold text-gray-700 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Pratinjau Langsung
              </h2>
              <button onClick={() => setIsPreviewOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Body / Article Mockup */}
            <div className="overflow-y-auto p-6 md:p-10 bg-white">
              {docType === "berita" ? (
                <>
                  {/* Dummy Image for Berita */}
                  <div className="w-full h-64 bg-gray-200 rounded-2xl mb-8 relative overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col">
                        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-sm font-medium">Gambar Utama Belum Diunggah</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1.5 text-primary" />
                      {categories.length > 0 ? categories.join(", ") : "Tidak Ada Kategori"}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6 leading-tight">
                    {title || "Judul Berita Akan Muncul di Sini"}
                  </h1>
                  
                  <div className="prose prose-lg max-w-none text-gray-700 prose-p:leading-relaxed whitespace-pre-wrap">
                    {content || "Isi berita akan muncul di sini. Silakan ketik sesuatu di editor teks."}
                  </div>
                </>
              ) : docType === "galeri" ? (
                <div className="max-w-xl mx-auto">
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-6 relative overflow-hidden shadow-md border border-gray-100">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col">
                        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                        <span className="text-sm font-medium">Foto Belum Diunggah</span>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4 text-center leading-tight">
                    {title || "Keterangan Foto Akan Muncul di Sini"}
                  </h1>
                  
                </div>
              ) : (
                <>
                  {/* Mockup for Pengumuman */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-2 h-full ${
                      priority === 'Penting' ? 'bg-red-500' : 
                      priority === 'Rutin' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    
                    <div className="pl-4 space-y-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                          priority === 'Penting' ? 'bg-red-100 text-red-700' : 
                          priority === 'Rutin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {priority}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900">
                        {title || "Judul Pengumuman Akan Muncul di Sini"}
                      </h2>
                      
                      <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {content || "Isi pengumuman akan muncul di sini."}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
