export type SiteService = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type PopulationCard = {
  title: string;
  value: string;
  unit: string;
};

export type SiteAnnouncement = {
  id: number;
  title: string;
  summary: string;
  date: string;
  status: string;
};

export type SiteContent = {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  quickServicesTitle: string;
  quickServicesDescription: string;
  services: SiteService[];
  populationTitle: string;
  populationDescription: string;
  populationYear: string;
  populationCards: PopulationCard[];
  ctaTitle: string;
  ctaDescription: string;
  announcementsTitle: string;
  announcementsDescription: string;
  announcements: SiteAnnouncement[];
  galleryTitle: string;
  galleryDescription: string;
  galleryImages: string[];
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  postalCode: string;
};

export const defaultSiteContent: SiteContent = {
  siteName: "Desa Contoh",
  tagline: "Pemerintah Kabupaten Contoh",
  heroTitle: "Selamat Datang di Desa Contoh",
  heroSubtitle: "Portal informasi, transparansi, pelayanan publik, dan potensi Desa Contoh.",
  heroBackground: "https://picsum.photos/seed/200/1600/900",
  quickServicesTitle: "Layanan Cepat",
  quickServicesDescription: "Akses berbagai layanan publik dan informasi penting Desa Contoh dengan mudah dan cepat.",
  services: [
    { id: "administrasi", title: "Surat Administrasi", description: "Layanan pengajuan surat keterangan dan administrasi kependudukan.", href: "/layanan/administrasi" },
    { id: "pengaduan", title: "Pengaduan Warga", description: "Sampaikan keluhan, aspirasi, atau laporan masalah di lingkungan desa.", href: "/layanan/pengaduan" },
    { id: "ppid", title: "PPID", description: "Layanan permohonan informasi publik secara transparan.", href: "/layanan/ppid" },
    { id: "bansos", title: "Bantuan Sosial", description: "Informasi dan pendaftaran program bantuan sosial desa.", href: "/layanan/bansos" },
    { id: "apbdes", title: "APB Desa", description: "Transparansi anggaran pendapatan dan belanja desa.", href: "/data-desa/apb-desa" },
    { id: "penduduk", title: "Data Penduduk", description: "Statistik dan demografi kependudukan Desa Contoh.", href: "/data-desa/statistik" },
    { id: "dokumen", title: "Download Dokumen", description: "Unduh peraturan desa, SK, dan formulir publik lainnya.", href: "/dokumen" },
    { id: "darurat", title: "Kontak Darurat", description: "Nomor penting dan layanan darurat di Desa Contoh.", href: "/layanan/kontak-darurat" },
  ],
  populationTitle: "Data Kependudukan",
  populationDescription: "Statistik demografi penduduk Desa Contoh berdasarkan pembaruan data terakhir tahun 2026.",
  populationYear: "2026",
  populationCards: [
    { title: "Total Penduduk", value: "3.456", unit: "Jiwa" },
    { title: "Laki-laki", value: "1.750", unit: "Jiwa" },
    { title: "Perempuan", value: "1.706", unit: "Jiwa" },
    { title: "Kepala Keluarga", value: "842", unit: "KK" },
  ],
  ctaTitle: "Punya Pertanyaan atau Ingin Mengajukan Layanan?",
  ctaDescription: "Pemerintah Desa Contoh siap melayani kebutuhan administrasi dan menampung aspirasi masyarakat untuk kemajuan bersama.",
  announcementsTitle: "Pengumuman Desa",
  announcementsDescription: "Informasi penting, jadwal kegiatan, dan pemberitahuan resmi dari Pemerintah Desa Contoh untuk seluruh masyarakat.",
  announcements: [
    { id: 1, title: "Pendaftaran Bantuan BLT Dana Desa Tahap IV", summary: "Bagi warga yang terdaftar sebagai penerima manfaat, harap mengumpulkan fotokopi KK dan KTP ke kantor desa.", date: "10 Okt 2026", status: "Penting" },
    { id: 2, title: "Pelayanan Perekaman E-KTP Keliling", summary: "Dinas Dukcapil akan melakukan pelayanan jemput bola perekaman E-KTP di Balai Desa Contoh.", date: "15 Okt 2026", status: "Pelayanan" },
    { id: 3, title: "Kerja Bakti Massal Persiapan Musim Hujan", summary: "Dihimbau kepada seluruh warga untuk mengikuti kerja bakti membersihkan saluran air di lingkungan masing-masing.", date: "20 Okt 2026", status: "Program Desa" },
  ],
  galleryTitle: "Galeri Desa",
  galleryDescription: "Dokumentasi berbagai kegiatan pemerintahan, kemasyarakatan, dan pembangunan di Desa Contoh.",
  galleryImages: [100, 101, 102, 103, 104, 105, 106, 107].map((seed) => `https://picsum.photos/seed/${seed}/800/600`),
  address: "Jalan Contoh No. 123, Dusun Contoh, Kecamatan Contoh, Kabupaten Contoh",
  phone: "0821-5020-8664",
  email: "contoh@kabupaten.go.id",
  officeHours: "Senin - Kamis: 08.00 - 15.00\nJumat: 08.00 - 11.00",
  postalCode: "75385",
};

export const siteContentStorageKey = "desa_site_content";

