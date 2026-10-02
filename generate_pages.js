const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');

// 1. Text Replacement
function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content
                .replace(/Kutai Kartanegara/gi, 'Kabupaten Contoh')
                .replace(/Marang Kayu/gi, 'Kecamatan Contoh')
                .replace(/Kalimantan Timur/gi, 'Provinsi Contoh')
                .replace(/Jalan Langaseng, Dusun Empang RT.003/gi, 'Jalan Contoh No. 123, Dusun Contoh')
                .replace(/64\.02\.17\.2005/g, '12.34.56.7890');
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

replaceInFiles(srcDir);

// 2. Generate Pages
const routes = [
    '/profil',
    '/profil/sejarah',
    '/profil/visi-misi',
    '/profil/geografis',
    '/profil/pemerintahan',
    '/profil/bpd',
    '/data-desa/penduduk',
    '/data-desa/apb-desa',
    '/layanan',
    '/layanan/administrasi',
    '/layanan/pengaduan',
    '/layanan/pengaduan/lacak',
    '/layanan/ppid',
    '/potensi',
    '/potensi/wisata',
    '/potensi/umkm',
    '/informasi/berita',
    '/informasi/berita/contoh-berita',
    '/informasi/berita/contoh-1',
    '/informasi/berita/contoh-2',
    '/informasi/berita/contoh-3',
    '/informasi/pengumuman',
    '/informasi/agenda',
    '/informasi/galeri',
    '/dokumen',
    '/peta',
    '/admin'
];

const template = (title) => `
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Halaman ${title}</h1>
        <p className="text-gray-500 mb-8">
          Halaman ini telah berhasil dibuat. Saat ini diisi dengan data dummy (placeholder) untuk keperluan pratinjau antarmuka dan penelusuran (navigation).
        </p>
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
`;

routes.forEach(route => {
    const routeParts = route.split('/').filter(Boolean);
    let currentPath = appDir;
    
    routeParts.forEach(part => {
        currentPath = path.join(currentPath, part);
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, { recursive: true });
        }
    });
    
    const pagePath = path.join(currentPath, 'page.tsx');
    const title = routeParts.map(word => word.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' - ');
    fs.writeFileSync(pagePath, template(title));
});

console.log('Dummy pages generated and text replaced successfully.');
