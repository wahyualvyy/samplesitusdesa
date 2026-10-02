import { Target, Compass, CheckCircle2, Sprout, HeartHandshake, ShieldCheck } from "lucide-react";
import { getVillageProfile } from "@/actions/profil";

export default async function VisiMisi() {
  const profile = await getVillageProfile();

  const defaultVisi = "Terwujudnya Desa Contoh yang Maju, Sejahtera, Mandiri, dan Berbudaya Berlandaskan Gotong Royong";
  const defaultMisi = "1. Mewujudkan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel guna memberikan pelayanan prima kepada masyarakat.\n2. Meningkatkan kualitas infrastruktur dasar yang merata dan berkelanjutan untuk mendukung aksesibilitas perekonomian warga.\n3. Mendorong pemberdayaan UMKM, kelompok tani, dan nelayan serta mengoptimalkan BUMDes sebagai motor penggerak ekonomi.\n4. Menjaga dan melestarikan nilai-nilai kearifan lokal, budaya gotong royong, serta kerukunan antar umat beragama.";

  const visi = profile?.visi || defaultVisi;
  const misi = profile?.misi || defaultMisi;

  const misiArray = misi.split('\n').filter(m => m.trim() !== "");
  
  const iconSet = [
    { icon: <ShieldCheck className="w-6 h-6" />, colorClass: "bg-blue-100 text-blue-600" },
    { icon: <Sprout className="w-6 h-6" />, colorClass: "bg-green-100 text-green-600" },
    { icon: <CheckCircle2 className="w-6 h-6" />, colorClass: "bg-amber-100 text-amber-600" },
    { icon: <HeartHandshake className="w-6 h-6" />, colorClass: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Visi Section */}
      <div className="relative bg-[#0f3d21] py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 rounded-full text-accent font-bold mb-8 uppercase tracking-wider text-sm border border-accent/30">
            <Target className="w-4 h-4" />
            <span>Visi Pemerintah Desa</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8">
            "{visi}"
          </h1>
          
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Visi ini merupakan cita-cita bersama untuk membangun desa yang unggul secara ekonomi tanpa meninggalkan nilai-nilai luhur dan kearifan lokal.
          </p>
        </div>
      </div>

      {/* Misi Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 inline-flex items-center">
              <Compass className="w-8 h-8 mr-3 text-primary" />
              Misi Desa Contoh
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {misiArray.map((misiText, idx) => {
              // Strip numbering (e.g. "1. " or "2. ") if exists for a cleaner look
              const cleanedText = misiText.replace(/^\d+[\.\)]\s*/, '');
              const iconData = iconSet[idx % iconSet.length];
              
              return (
                <div key={idx} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconData.colorClass}`}>
                    {iconData.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Misi {idx + 1}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {cleanedText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}
