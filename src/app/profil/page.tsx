import Image from "next/image";
import { MapPin, Target, Users, Landmark, BookOpen } from "lucide-react";
import { getVillageProfile } from "@/actions/profil";

export default async function ProfilPage() {
  const profile = await getVillageProfile();
  
  const sejarah = profile?.sejarah || "Desa Contoh pada awalnya merupakan kawasan pesisir yang dihuni oleh kelompok nelayan tradisional.\nSeiring berjalannya waktu, wilayah ini berkembang menjadi pusat perdagangan lokal karena lokasinya yang strategis.\n\nSecara administratif, Desa Contoh diresmikan menjadi desa definitif pada tahun 1982.\nSejak saat itu, pemerintahan desa terus berupaya membangun infrastruktur dan meningkatkan kesejahteraan masyarakat melalui berbagai program pemberdayaan UMKM dan pariwisata pantai.";
  const visi = profile?.visi || "Terwujudnya Desa Contoh yang Maju, Sejahtera, Mandiri, dan Berbudaya Berlandaskan Gotong Royong";
  const misi = profile?.misi || "1. Meningkatkan kualitas pelayanan publik melalui pemerintahan yang transparan dan akuntabel.\n2. Membangun infrastruktur desa yang merata dan berkelanjutan.\n3. Mengoptimalkan potensi wisata pesisir dan UMKM untuk meningkatkan ekonomi warga.";

  const misiArray = misi.split('\n').filter(m => m.trim() !== "");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#0f3d21]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Profil Desa Contoh</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan Desa Contoh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section id="sejarah" className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">Sejarah Desa</h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                {sejarah.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === "") return null;
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </section>

            <section id="visi-misi" className="space-y-4 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900">Visi & Misi</h2>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Visi:</h3>
                <p className="text-xl text-primary font-heading font-semibold leading-tight italic">
                  "{visi}"
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Misi:</h3>
                <ul className="space-y-3 text-gray-600">
                  {misiArray.map((misiItem, idx) => {
                    const cleanedItem = misiItem.replace(/^\d+[\.\)]\s*/, '');
                    return (
                      <li key={idx} className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mr-3 text-sm font-bold mt-0.5">{idx + 1}</span>
                        <span>{cleanedItem}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-border/60">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                <Landmark className="w-5 h-5 mr-2 text-primary" />
                Data Wilayah
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Luas Wilayah</span>
                  <span className="font-medium text-gray-900">{profile?.luasWilayah || '-'} km²</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Jumlah Dusun</span>
                  <span className="font-medium text-gray-900">{profile?.jumlahDusun || '-'} Dusun</span>
                </li>
                {profile?.koordinatLat && (
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Koordinat</span>
                    <span className="font-medium text-gray-900 text-xs">{profile.koordinatLat}, {profile.koordinatLng}</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="relative h-64 rounded-2xl overflow-hidden border border-border/60">
              {profile?.koordinatLat && profile?.koordinatLng ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${profile.koordinatLat},${profile.koordinatLng}&t=m&z=15&output=embed&iwloc=near`}
                ></iframe>
              ) : (
                <>
                  <Image 
                    src="https://picsum.photos/seed/profil/800/600" 
                    alt="Peta Desa" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl">
                <div className="flex items-center text-sm font-bold text-gray-900">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Pusat Pemerintahan
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
