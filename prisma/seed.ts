import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed for Desa Simoketawang...");

  // ==========================================
  // 1. SITE SETTINGS
  // ==========================================
  await prisma.siteSetting.upsert({
    where: { id: "1" },
    update: {
      siteName: "Desa Simoketawang",
      tagline: "Pemerintah Desa Simoketawang",
      address: "Jl. Raya Simoketawang No.1, Kec. Wonoayu, Kab. Sidoarjo, Jawa Timur 61261",
      email: "desa.simoketawang@sidoarjokab.go.id",
      phone: "(031) 8910-1234",
      postalCode: "61261",
      officeHours: "Senin - Jumat, 08.00 - 15.00 WIB",
      heroTitle: "Selamat Datang di Desa Simoketawang",
      heroSubtitle: "Portal resmi informasi, pelayanan publik, dan transparansi Pemerintah Desa Simoketawang, Kecamatan Wonoayu, Kabupaten Sidoarjo.",
      heroBackground: "https://picsum.photos/seed/simoketawang-hero/1600/900",
      kecamatan: "Wonoayu",
      kabupaten: "Sidoarjo",
      provinsi: "Jawa Timur",
      jamPelayanan: "Senin-Kamis: 08.00-15.00|Jumat: 08.00-11.00",
    },
    create: {
      id: "1",
      siteName: "Desa Simoketawang",
      tagline: "Pemerintah Desa Simoketawang",
      address: "Jl. Raya Simoketawang No.1, Kec. Wonoayu, Kab. Sidoarjo, Jawa Timur 61261",
      email: "desa.simoketawang@sidoarjokab.go.id",
      phone: "(031) 8910-1234",
      postalCode: "61261",
      officeHours: "Senin - Jumat, 08.00 - 15.00 WIB",
      heroTitle: "Selamat Datang di Desa Simoketawang",
      heroSubtitle: "Portal resmi informasi, pelayanan publik, dan transparansi Pemerintah Desa Simoketawang, Kecamatan Wonoayu, Kabupaten Sidoarjo.",
      heroBackground: "https://picsum.photos/seed/simoketawang-hero/1600/900",
      kecamatan: "Wonoayu",
      kabupaten: "Sidoarjo",
      provinsi: "Jawa Timur",
      jamPelayanan: "Senin-Kamis: 08.00-15.00|Jumat: 08.00-11.00",
    },
  });
  console.log("  ✅ SiteSetting seeded");

  // ==========================================
  // 2. VILLAGE PROFILE
  // ==========================================
  await prisma.villageProfile.upsert({
    where: { id: "1" },
    update: {
      profilSingkat: "Desa Simoketawang adalah desa yang terletak di Kecamatan Wonoayu, Kabupaten Sidoarjo, Provinsi Jawa Timur. Desa ini dikenal sebagai desa agraris dengan hamparan sawah yang subur dan masyarakat yang ramah serta menjunjung tinggi nilai-nilai gotong royong.",
      luasWilayah: "3.84",
      jumlahDusun: "4",
      koordinatLat: "-7.4478",
      koordinatLng: "112.6773",
      sejarah: "Desa Simoketawang memiliki sejarah panjang yang erat kaitannya dengan perkembangan Kerajaan Majapahit di wilayah Jawa Timur. Nama 'Simoketawang' berasal dari kata 'Simo' yang berarti harimau, dan 'ketawang' yang berarti langit — mencerminkan semangat keberanian dan cita-cita tinggi masyarakatnya.\n\nPada masa kolonial Belanda, desa ini merupakan salah satu sentra pertanian padi yang penting di wilayah Sidoarjo. Sistem irigasi yang dibangun sejak abad ke-19 masih berfungsi hingga hari ini.\n\nSecara administratif, Desa Simoketawang diresmikan sebagai desa definitif pada tahun 1952. Sejak saat itu, pemerintahan desa terus berupaya membangun infrastruktur dan mengembangkan potensi ekonomi lokal melalui sektor pertanian, peternakan, dan UMKM.\n\nKini, Desa Simoketawang terus bertransformasi menjadi desa modern berbasis teknologi sambil tetap mempertahankan kearifan lokal dan budaya gotong royong yang menjadi identitasnya.",
      visi: "Terwujudnya Desa Simoketawang yang Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman, Taqwa, dan Semangat Gotong Royong Menuju Masyarakat yang Adil dan Makmur.",
      misi: "1. Meningkatkan kualitas pelayanan publik melalui tata kelola pemerintahan yang transparan, akuntabel, dan inovatif.\n2. Membangun dan meningkatkan infrastruktur desa yang merata, berkualitas, dan berwawasan lingkungan.\n3. Mengoptimalkan potensi pertanian dan ekonomi lokal melalui pemberdayaan UMKM dan koperasi desa.\n4. Meningkatkan kualitas sumber daya manusia melalui pendidikan, kesehatan, dan pemberdayaan perempuan.\n5. Melestarikan nilai-nilai budaya lokal dan kearifan tradisional sebagai identitas desa.",
      timeline: JSON.stringify([
        { year: "1952", event: "Desa Simoketawang diresmikan sebagai desa definitif" },
        { year: "1975", event: "Pembangunan kantor desa permanen pertama" },
        { year: "1995", event: "Perluasan jaringan irigasi sawah desa" },
        { year: "2010", event: "Pembangunan Balai Desa modern" },
        { year: "2019", event: "Peluncuran website desa perdana" },
        { year: "2024", event: "Implementasi sistem informasi desa digital" },
      ]),
      bpdInfo: "Badan Permusyawaratan Desa (BPD) Simoketawang adalah lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa. BPD berfungsi sebagai mitra kerja Kepala Desa dalam menyusun Peraturan Desa, menampung aspirasi masyarakat, serta mengawasi jalannya pemerintahan desa.\n\nBPD Simoketawang beranggotakan 5 orang yang merepresentasikan berbagai unsur masyarakat desa, dipilih melalui mekanisme musyawarah dusun setiap 6 tahun sekali.",
    },
    create: {
      id: "1",
      profilSingkat: "Desa Simoketawang adalah desa yang terletak di Kecamatan Wonoayu, Kabupaten Sidoarjo, Provinsi Jawa Timur.",
      luasWilayah: "3.84",
      jumlahDusun: "4",
      koordinatLat: "-7.4478",
      koordinatLng: "112.6773",
      sejarah: "Desa Simoketawang memiliki sejarah panjang sejak era Majapahit.",
      visi: "Terwujudnya Desa Simoketawang yang Mandiri dan Sejahtera.",
      misi: "1. Meningkatkan pelayanan publik.\n2. Membangun infrastruktur.",
      timeline: "[]",
      bpdInfo: "",
    },
  });
  console.log("  ✅ VillageProfile seeded");

  // ==========================================
  // 3. VILLAGE SERVICES (menggantikan hardcode)
  // ==========================================
  await prisma.villageService.deleteMany();
  await prisma.villageService.createMany({
    data: [
      { title: "Surat Administrasi", description: "Layanan pengajuan surat keterangan dan administrasi kependudukan seperti KK baru, SKTM, dan pengantar pindah domisili.", href: "/layanan/administrasi", icon: "FileSignature", color: "bg-blue-50 text-blue-600 border-blue-100", order: 1 },
      { title: "Pengaduan Warga", description: "Sampaikan keluhan, aspirasi, atau laporan masalah di lingkungan desa langsung kepada perangkat desa.", href: "/layanan/pengaduan", icon: "MessageSquareWarning", color: "bg-amber-50 text-amber-600 border-amber-100", order: 2 },
      { title: "PPID", description: "Layanan permohonan informasi publik secara transparan sesuai UU Keterbukaan Informasi Publik.", href: "/layanan/ppid", icon: "ShieldCheck", color: "bg-emerald-50 text-emerald-600 border-emerald-100", order: 3 },
      { title: "Bantuan Sosial", description: "Informasi dan pendaftaran program bantuan sosial desa: BLT, PKH, BPNT, dan program sosial lainnya.", href: "/layanan/bansos", icon: "HeartHandshake", color: "bg-rose-50 text-rose-600 border-rose-100", order: 4 },
      { title: "APB Desa", description: "Transparansi anggaran pendapatan dan belanja desa secara lengkap dan terperinci.", href: "/data-desa/apb-desa", icon: "PieChart", color: "bg-purple-50 text-purple-600 border-purple-100", order: 5 },
      { title: "Data Penduduk", description: "Statistik dan demografi kependudukan Desa Simoketawang secara real-time.", href: "/data-desa/statistik", icon: "Users", color: "bg-indigo-50 text-indigo-600 border-indigo-100", order: 6 },
      { title: "Download Dokumen", description: "Unduh peraturan desa, SK Kades, dan formulir publik yang tersedia untuk masyarakat.", href: "/dokumen", icon: "Download", color: "bg-cyan-50 text-cyan-600 border-cyan-100", order: 7 },
      { title: "Kontak Darurat", description: "Nomor penting dan layanan darurat: Ambulans, Polisi, Pemadam Kebakaran, dan lainnya.", href: "/layanan/kontak-darurat", icon: "PhoneCall", color: "bg-red-50 text-red-600 border-red-100", order: 8 },
    ],
  });
  console.log("  ✅ VillageServices seeded");

  // ==========================================
  // 4. PAGE SECTIONS (CMS Content)
  // ==========================================
  const sections = [
    { page: "home", section: "cta", content: JSON.stringify({ title: "Punya Pertanyaan atau Ingin Mengajukan Layanan?", subtitle: "Pemerintah Desa Simoketawang siap melayani kebutuhan administrasi dan menampung aspirasi masyarakat untuk kemajuan bersama.", button1Text: "Pengaduan Warga", button1Href: "/layanan/pengaduan", button2Text: "Layanan Administrasi", button2Href: "/layanan/administrasi" }) },
    { page: "home", section: "services-heading", content: JSON.stringify({ title: "Layanan Cepat", subtitle: "Akses berbagai layanan publik dan informasi penting Desa Simoketawang dengan mudah dan cepat." }) },
    { page: "home", section: "gallery-heading", content: JSON.stringify({ title: "Galeri Desa", subtitle: "Koleksi foto kegiatan dan momen penting di Desa Simoketawang.", linkText: "Lihat Semua Foto" }) },
    { page: "home", section: "overview-heading", content: JSON.stringify({ badge: "Profil Singkat", title: "Mengenal Lebih Dekat", highlight: "Desa Simoketawang", lokasi: "Terletak di Kecamatan Wonoayu, Kabupaten Sidoarjo, Jawa Timur dengan potensi pertanian yang subur." }) },
    { page: "home", section: "welcome-heading", content: JSON.stringify({ title: "Sambutan Kepala Desa", linkText: "Lihat Profil Pemerintahan Lengkap", linkHref: "/profil/pemerintahan" }) },
  ];
  for (const s of sections) {
    await prisma.pageSection.upsert({
      where: { page_section: { page: s.page, section: s.section } },
      update: { content: s.content },
      create: { ...s, isVisible: true, order: 0 },
    });
  }
  console.log("  ✅ PageSections seeded");

  // ==========================================
  // 5. USER ADMIN + NEWS
  // ==========================================
  const user = await prisma.user.upsert({
    where: { email: "admin@simoketawang.id" },
    update: {},
    create: { name: "Admin Desa", email: "admin@simoketawang.id", password: "admin123", role: "SUPER_ADMIN" },
  });

  const catUmum = await prisma.newsCategory.upsert({ where: { slug: "umum" }, update: {}, create: { name: "Umum", slug: "umum" } });
  const catPem = await prisma.newsCategory.upsert({ where: { slug: "pemerintahan" }, update: {}, create: { name: "Pemerintahan", slug: "pemerintahan" } });
  const catBangun = await prisma.newsCategory.upsert({ where: { slug: "pembangunan" }, update: {}, create: { name: "Pembangunan", slug: "pembangunan" } });

  const newsItems = [
    { title: "Musdes Pembahasan RKP Desa Simoketawang Tahun 2025", slug: "musdes-rkp-2025", excerpt: "Musyawarah Desa untuk membahas Rencana Kerja Pemerintah Desa tahun 2025.", content: "Pemerintah Desa Simoketawang menggelar Musyawarah Desa (Musdes) pada Senin, 15 Januari 2025, bertempat di Balai Desa. Musdes ini membahas Rencana Kerja Pemerintah Desa (RKP Desa) tahun 2025 yang mencakup program pembangunan infrastruktur dan pemberdayaan masyarakat. Hadir para tokoh masyarakat, ketua RT/RW, anggota BPD, dan perwakilan warga dari seluruh dusun.", image: "https://picsum.photos/seed/news1-simo/800/400", isPublished: true, categoryId: catPem.id, authorId: user.id },
    { title: "Panen Raya Padi Simoketawang Capai Rekor Tertinggi", slug: "panen-raya-2025", excerpt: "Petani Desa Simoketawang berhasil mencatat rekor panen padi tertinggi 7,2 ton/ha.", content: "Petani Desa Simoketawang merayakan keberhasilan panen raya padi yang luar biasa pada musim tanam pertama tahun 2025. Dengan rata-rata hasil panen mencapai 7,2 ton per hektar, angka ini menjadi rekor tertinggi dalam 10 tahun terakhir. Keberhasilan ini didukung penggunaan varietas padi unggul dan program intensifikasi pertanian dari Pemerintah Desa.", image: "https://picsum.photos/seed/news2-simo/800/400", isPublished: true, categoryId: catUmum.id, authorId: user.id },
    { title: "Pembangunan Jalan Rabat Beton Dusun Ketawang Selesai 100%", slug: "jalan-beton-ketawang", excerpt: "Proyek jalan rabat beton sepanjang 450 meter di Dusun Ketawang rampung dikerjakan.", content: "Pemerintah Desa Simoketawang berhasil menyelesaikan pembangunan jalan rabat beton di Dusun Ketawang sepanjang 450 meter. Proyek senilai Rp 280 juta dari Dana Desa 2024 dikerjakan secara swakelola melibatkan 45 tenaga kerja lokal. Dengan selesainya pembangunan ini, aksesibilitas warga Dusun Ketawang menjadi jauh lebih lancar.", image: "https://picsum.photos/seed/news3-simo/800/400", isPublished: true, categoryId: catBangun.id, authorId: user.id },
    { title: "Posyandu Mawar Simoketawang Terima Penghargaan Terbaik Sidoarjo", slug: "posyandu-award-2025", excerpt: "Posyandu Mawar raih penghargaan Posyandu Terbaik tingkat Kabupaten Sidoarjo.", content: "Posyandu Mawar Desa Simoketawang meraih penghargaan Posyandu Terbaik tingkat Kabupaten Sidoarjo tahun 2025. Penghargaan diberikan atas konsistensi pelayanan kesehatan ibu dan anak yang berkualitas selama lebih dari 5 tahun berturut-turut. Prestasi ini menjadi kebanggaan seluruh warga Desa Simoketawang.", image: "https://picsum.photos/seed/news4-simo/800/400", isPublished: true, categoryId: catUmum.id, authorId: user.id },
    { title: "Pelatihan Digital Marketing untuk UMKM Desa Simoketawang", slug: "pelatihan-umkm-digital", excerpt: "35 pelaku UMKM Simoketawang ikuti pelatihan pemasaran digital.", content: "Sebanyak 35 pelaku UMKM Desa Simoketawang mengikuti pelatihan Digital Marketing yang digelar dua hari di Balai Desa. Pelatihan mencakup konten media sosial, fotografi produk dengan ponsel, manajemen toko online, dan strategi pemasaran digital. Diharapkan produk UMKM Simoketawang dapat menjangkau pasar lebih luas.", image: "https://picsum.photos/seed/news5-simo/800/400", isPublished: true, categoryId: catUmum.id, authorId: user.id },
  ];
  for (const n of newsItems) {
    await prisma.news.upsert({ where: { slug: n.slug }, update: {}, create: n });
  }
  console.log("  ✅ News seeded");

  // ==========================================
  // 6. ANNOUNCEMENTS
  // ==========================================
  await prisma.announcement.deleteMany();
  await prisma.announcement.createMany({
    data: [
      { title: "Jadwal Posyandu Bulan Oktober 2025", content: "Posyandu Mawar dilaksanakan pada Selasa, 8 Oktober 2025 pukul 08.00-11.00 WIB di Balai Dusun Simo. Wajib hadir bagi ibu hamil dan balita usia 0-59 bulan.", status: "Aktif", date: new Date("2025-10-08") },
      { title: "Pengumuman: Pemilihan RT/RW Periode 2025-2028", content: "Panitia mengumumkan pelaksanaan pemilihan RT/RW pada tanggal 20 Oktober 2025. Calon harap mendaftar ke kantor desa sebelum 10 Oktober 2025.", status: "Penting", date: new Date("2025-10-01") },
      { title: "Informasi Penerimaan BPNT Tahap 4 Tahun 2025", content: "Penyaluran BPNT Tahap 4 akan dilaksanakan pada minggu ketiga Oktober 2025. Penerima manfaat harap memastikan kartu KKS aktif.", status: "Program Desa", date: new Date("2025-10-05") },
    ],
  });
  console.log("  ✅ Announcements seeded");

  // ==========================================
  // 7. UMKM & PRODUK
  // ==========================================
  await prisma.product.deleteMany();
  await prisma.uMKM.deleteMany();
  const umkmList = [
    { name: "Krupuk Udang Bu Sari", ownerName: "Sari Indah", category: "Kuliner & Olahan Pangan", description: "Produksi krupuk udang khas Simoketawang dengan resep turun-temurun. Telah memasarkan ke seluruh Jawa Timur.", address: "Dusun Simo RT 03/RW 02", phone: "0812-3456-7890", image: "https://picsum.photos/seed/umkm-krupuk/600/400", products: [{ name: "Krupuk Udang Original 250gr", price: 15000, description: "Krupuk gurih renyah", image: "https://picsum.photos/seed/prod-krupuk1/400/400" }, { name: "Krupuk Udang Pedas 250gr", price: 17000, description: "Varian pedas", image: "https://picsum.photos/seed/prod-krupuk2/400/400" }] },
    { name: "Batik Tulis Simoketawang", ownerName: "Hartini Rahayu", category: "Kerajinan & Fashion", description: "Produsen batik tulis dengan motif khas Sidoarjo: udang dan ikan bandeng. Dikerjakan pengrajin lokal terampil.", address: "Dusun Ketawang RT 01/RW 01", phone: "0813-2233-4455", image: "https://picsum.photos/seed/umkm-batik/600/400", products: [{ name: "Kain Batik Tulis Motif Udang (2m)", price: 350000, description: "Batik tulis asli motif khas Sidoarjo", image: "https://picsum.photos/seed/prod-batik1/400/400" }, { name: "Baju Batik Pria", price: 180000, description: "Kemeja batik M-XXL", image: "https://picsum.photos/seed/prod-batik2/400/400" }] },
    { name: "UD Tani Sejahtera", ownerName: "Pak Slamet", category: "Pertanian & Agribisnis", description: "Usaha pertanian modern menyediakan beras premium dari sawah Simoketawang langsung ke konsumen.", address: "Dusun Wonorejo RT 02/RW 04", phone: "0811-9988-7766", image: "https://picsum.photos/seed/umkm-tani/600/400", products: [{ name: "Beras Putih Premium 5kg", price: 70000, description: "Varietas Ciherang, pulen dan harum", image: "https://picsum.photos/seed/prod-beras1/400/400" }, { name: "Beras Merah Organik 2kg", price: 45000, description: "Beras merah tanpa pestisida", image: "https://picsum.photos/seed/prod-beras2/400/400" }] },
    { name: "Warung Kopi Pak Budi", ownerName: "Budi Santoso", category: "Kuliner & Minuman", description: "Warung kopi tradisional menyajikan kopi tubruk dan jamu. Tempat nongkrong favorit warga.", address: "Dusun Krajan RT 01/RW 03", phone: "0857-1234-5678", image: "https://picsum.photos/seed/umkm-kopi/600/400", products: [{ name: "Kopi Tubruk Robusta", price: 8000, description: "Kopi tubruk khas Jawa", image: "https://picsum.photos/seed/prod-kopi1/400/400" }, { name: "Wedang Jahe Rempah", price: 10000, description: "Jahe hangat dengan rempah pilihan", image: "https://picsum.photos/seed/prod-kopi2/400/400" }] },
  ];
  for (const u of umkmList) {
    const { products, ...base } = u;
    const umkm = await prisma.uMKM.create({ data: base });
    for (const p of products) await prisma.product.create({ data: { ...p, umkmId: umkm.id } });
  }
  console.log("  ✅ UMKM seeded");

  // ==========================================
  // 8. TOURISM
  // ==========================================
  await prisma.tourism.deleteMany();
  await prisma.tourism.createMany({
    data: [
      { name: "Embung Simoketawang", description: "Embung atau waduk mini milik desa yang berfungsi sebagai sarana irigasi sekaligus menjadi spot wisata alam. Dikelilingi pepohonan rindang dan hamparan sawah hijau.", location: "Dusun Simo, Desa Simoketawang", latitude: -7.448, longitude: 112.678, image: "https://picsum.photos/seed/wisata-embung/800/500", facilities: "Area parkir, Gazebo, Toilet umum, Spot foto" },
      { name: "Agrowisata Sawah Simoketawang", description: "Wisata unik di tengah hamparan sawah 120 hektar. Pengunjung belajar menanam padi dan menikmati kuliner khas berbahan padi.", location: "Dusun Ketawang, Desa Simoketawang", latitude: -7.450, longitude: 112.675, image: "https://picsum.photos/seed/wisata-sawah/800/500", facilities: "Guide lokal, Warung makan, Outbound sawah" },
      { name: "Sentra Kerajinan Batik Simoketawang", description: "Kunjungi pusat produksi batik tulis dan saksikan proses pembuatan batik. Pengunjung bisa mencoba membatik sendiri.", location: "Dusun Ketawang RT 01/RW 01", latitude: -7.446, longitude: 112.676, image: "https://picsum.photos/seed/wisata-batik/800/500", facilities: "Workshop batik, Toko batik, Ruang galeri" },
    ],
  });
  console.log("  ✅ Tourism seeded");

  // ==========================================
  // 9. APBDES 2025
  // ==========================================
  await prisma.aPBDesCategory.deleteMany();
  await prisma.aPBDes.deleteMany();
  const apb = await prisma.aPBDes.create({ data: { year: 2025, pendapatan: 1456780000, belanja: 1389500000, pembiayaan: 67280000 } });
  await prisma.aPBDesCategory.createMany({
    data: [
      { apbDesId: apb.id, type: "PENDAPATAN", name: "Dana Desa (DD)", amount: 875000000, realisasi: 875000000, progress: 100 },
      { apbDesId: apb.id, type: "PENDAPATAN", name: "Alokasi Dana Desa (ADD)", amount: 432780000, realisasi: 390000000, progress: 90 },
      { apbDesId: apb.id, type: "PENDAPATAN", name: "Pendapatan Asli Desa (PADes)", amount: 149000000, realisasi: 120000000, progress: 80.5 },
      { apbDesId: apb.id, type: "BELANJA", name: "Penyelenggaraan Pemerintahan", amount: 389500000, realisasi: 340000000, progress: 87.3 },
      { apbDesId: apb.id, type: "BELANJA", name: "Pembangunan Desa", amount: 650000000, realisasi: 580000000, progress: 89.2 },
      { apbDesId: apb.id, type: "BELANJA", name: "Pemberdayaan Masyarakat", amount: 195000000, realisasi: 150000000, progress: 76.9 },
      { apbDesId: apb.id, type: "BELANJA", name: "Penanggulangan Bencana", amount: 155000000, realisasi: 100000000, progress: 64.5 },
      { apbDesId: apb.id, type: "PEMBIAYAAN", name: "Penerimaan (SiLPA)", amount: 95000000, realisasi: 95000000, progress: 100 },
      { apbDesId: apb.id, type: "PEMBIAYAAN", name: "Pengeluaran Pembiayaan", amount: 27720000, realisasi: 20000000, progress: 72.1 },
    ],
  });
  console.log("  ✅ APBDes 2025 seeded");

  // ==========================================
  // 10. GALLERY
  // ==========================================
  await prisma.galleryImage.deleteMany();
  await prisma.galleryImage.createMany({
    data: [
      { title: "Musyawarah Desa 2025", category: "Pemerintahan", imageUrl: "https://picsum.photos/seed/gal1-simo/800/600" },
      { title: "Panen Raya Padi Simoketawang", category: "Kegiatan", imageUrl: "https://picsum.photos/seed/gal2-simo/800/600" },
      { title: "Pembangunan Jalan Rabat Beton Ketawang", category: "Pembangunan", imageUrl: "https://picsum.photos/seed/gal3-simo/800/600" },
      { title: "Posyandu Mawar - Pelayanan Kesehatan", category: "Sosial", imageUrl: "https://picsum.photos/seed/gal4-simo/800/600" },
      { title: "Embung Simoketawang - Wisata Alam", category: "Pariwisata", imageUrl: "https://picsum.photos/seed/gal5-simo/800/600" },
      { title: "Pelatihan Batik UMKM Desa", category: "Kegiatan", imageUrl: "https://picsum.photos/seed/gal6-simo/800/600" },
      { title: "Agrowisata Sawah Hijau", category: "Pariwisata", imageUrl: "https://picsum.photos/seed/gal7-simo/800/600" },
      { title: "Gotong Royong Warga Simoketawang", category: "Masyarakat", imageUrl: "https://picsum.photos/seed/gal8-simo/800/600" },
    ],
  });
  console.log("  ✅ Gallery seeded");

  // ==========================================
  // 11. DEVELOPMENT PROJECTS
  // ==========================================
  await prisma.developmentProject.deleteMany();
  await prisma.developmentProject.createMany({
    data: [
      { name: "Pembangunan Jalan Rabat Beton Dusun Ketawang", location: "Dusun Ketawang", budget: 280000000, fundingSource: "Dana Desa 2024", year: 2024, progress: 100, status: "Selesai", image: "https://picsum.photos/seed/proj1-simo/600/400", description: "Jalan rabat beton 450m untuk meningkatkan aksesibilitas warga." },
      { name: "Renovasi Balai Desa Simoketawang", location: "Dusun Simo", budget: 350000000, fundingSource: "Dana Desa 2025", year: 2025, progress: 65, status: "Berjalan", image: "https://picsum.photos/seed/proj2-simo/600/400", description: "Renovasi total Balai Desa untuk kapasitas dan kenyamanan pelayanan." },
      { name: "Pembangunan Embung Serbaguna", location: "Dusun Wonorejo", budget: 520000000, fundingSource: "Dana Desa 2025", year: 2025, progress: 30, status: "Berjalan", image: "https://picsum.photos/seed/proj3-simo/600/400", description: "Embung untuk ketahanan irigasi dan potensi wisata desa." },
      { name: "Pemasangan Lampu Jalan LED", location: "Seluruh Desa", budget: 95000000, fundingSource: "ADD 2025", year: 2025, progress: 10, status: "Perencanaan", image: "https://picsum.photos/seed/proj4-simo/600/400", description: "80 titik lampu jalan LED untuk keamanan dan penerangan desa." },
    ],
  });
  console.log("  ✅ DevelopmentProjects seeded");

  // ==========================================
  // 12. SURAT DESA (DOCUMENT TEMPLATES)
  // ==========================================
  await prisma.documentTemplate.deleteMany();
  
  const templateSurat = [
    {
      name: "Surat Keterangan Domisili",
      slug: "surat-keterangan-domisili",
      description: "Surat untuk membuktikan tempat tinggal warga.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN DOMISILI",
        body: "Yang bertanda tangan di bawah ini menerangkan bahwa nama tersebut di atas benar-benar berdomisili di Desa Simoketawang.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Tidak Mampu (SKTM)",
      slug: "sktm",
      description: "Surat keterangan untuk keperluan keringanan biaya pendidikan/kesehatan.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN TIDAK MAMPU",
        body: "Yang bersangkutan adalah benar warga desa kami dan tergolong keluarga tidak mampu/pra-sejahtera.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Usaha (SKU)",
      slug: "sku",
      description: "Surat keterangan kepemilikan usaha untuk pengajuan KUR atau keperluan bank.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN USAHA",
        body: "Berdasarkan pengamatan kami, warga tersebut di atas benar-benar memiliki usaha.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Kelahiran",
      slug: "keterangan-kelahiran",
      description: "Surat pengantar untuk pengurusan Akta Kelahiran anak.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN KELAHIRAN",
        body: "Telah lahir anak dari pasangan suami istri di atas pada tanggal tersebut.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Kematian",
      slug: "keterangan-kematian",
      description: "Surat pengantar untuk pengurusan Akta Kematian.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN KEMATIAN",
        body: "Warga tersebut telah meninggal dunia di rumah pada tanggal yang tercantum.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Pengantar SKCK",
      slug: "pengantar-skck",
      description: "Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT PENGANTAR SKCK",
        body: "Sepanjang pengetahuan kami, warga tersebut berkelakuan baik dan tidak pernah tersangkut tindak pidana.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Pengantar Nikah",
      slug: "pengantar-nikah",
      description: "Surat pengantar pengurusan administrasi pernikahan di KUA.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT PENGANTAR NIKAH",
        body: "Warga tersebut bermaksud melangsungkan pernikahan di KUA setempat.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Ahli Waris",
      slug: "keterangan-ahli-waris",
      description: "Surat pernyataan ahli waris sah untuk keperluan administrasi bank atau tanah.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN AHLI WARIS",
        body: "Nama-nama tersebut di bawah ini adalah benar ahli waris dari Almarhum.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Riwayat Tanah",
      slug: "riwayat-tanah",
      description: "Surat penguasaan fisik bidang tanah (Sporadik).",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT RIWAYAT TANAH",
        body: "Tanah tersebut dikuasai secara fisik dan tidak dalam sengketa.",
        footer: "Kepala Desa Simoketawang"
      })
    },
    {
      name: "Surat Keterangan Penghasilan",
      slug: "keterangan-penghasilan",
      description: "Surat pernyataan jumlah penghasilan untuk pekerja non-formal.",
      content: JSON.stringify({
        header: "PEMERINTAH KABUPATEN SIDOARJO\nKECAMATAN WONOAYU\nDESA SIMOKETAWANG",
        title: "SURAT KETERANGAN PENGHASILAN",
        body: "Warga tersebut memiliki rata-rata penghasilan per bulan sebagaimana tercantum di bawah ini.",
        footer: "Kepala Desa Simoketawang"
      })
    }
  ];

  await prisma.documentTemplate.createMany({
    data: templateSurat,
  });
  console.log("  ✅ Surat Desa (Templates) seeded");

  console.log("\n🎉 Seed completed successfully for Desa Simoketawang!");
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
