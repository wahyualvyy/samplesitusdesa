import Link from "next/link";
import { Users, Mail, Phone } from "lucide-react";
import { getVillageOfficials } from "@/actions/profil";

export default async function PemerintahanDesa() {
  let officials = await getVillageOfficials();
  
  const defaultOfficials = [
      { name: "Budi Santoso, S.E.", position: "Kepala Desa", image: "https://picsum.photos/seed/kades/400/400", description: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di Website Resmi Pemerintah Desa Contoh.\n\nPuji syukur senantiasa kita panjatkan kehadirat Allah SWT. Di era digital ini, ketersediaan informasi yang cepat, akurat, dan transparan menjadi sebuah kebutuhan mutlak bagi masyarakat. Website ini dibangun sebagai wujud komitmen kami dalam mewujudkan e-Government di tingkat desa.\n\nMelalui portal ini, kami berharap dapat mendekatkan pelayanan publik kepada warga, mempublikasikan potensi wisata dan ekonomi desa, serta menjadi jembatan transparansi pembangunan dan anggaran desa kepada seluruh masyarakat Desa Contoh." },
      { name: "Siti Aminah, S.A.P.", position: "Sekretaris Desa", image: "https://picsum.photos/seed/sekdes/400/400" },
      { name: "H. Ahmad Fauzi", position: "Kaur Keuangan", image: "https://picsum.photos/seed/keuangan/400/400" },
      { name: "Rina Marlina, S.Kom.", position: "Kaur Perencanaan & TU", image: "https://picsum.photos/seed/perencanaan/400/400" },
      { name: "Joko Anwar", position: "Kasi Pemerintahan", image: "https://picsum.photos/seed/pemerintahan/400/400" },
      { name: "Hendra Gunawan", position: "Kasi Kesejahteraan", image: "https://picsum.photos/seed/kesejahteraan/400/400" },
      { name: "Wahyu Hidayat", position: "Kepala Dusun I", image: "https://picsum.photos/seed/kadus1/400/400" },
      { name: "M. Rizky", position: "Kepala Dusun II", image: "https://picsum.photos/seed/kadus2/400/400" }
  ];

  if (officials.length === 0) {
    officials = defaultOfficials as any;
  }

  const kades = officials.find(o => o.position.toLowerCase().includes("kepala desa")) || officials[0];
  const otherOfficials = officials.filter(o => o !== kades);

  const bpdDeskripsi = "BPD merupakan lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa. BPD berfungsi menetapkan Peraturan Desa bersama Kepala Desa, menampung dan menyalurkan aspirasi masyarakat.";
  const bpdPhone = "0811-2233-4455";
  const bpdEmail = "bpd.contoh@gmail.com";

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Pemerintahan Desa</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Mengenal lebih dekat susunan aparatur pemerintah desa yang berkomitmen melayani masyarakat dengan sepenuh hati.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        
        {/* Sambutan Kepala Desa Card */}
        {kades && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-gray-50 shadow-lg relative shrink-0 z-10 bg-gray-100">
              {kades.image ? (
                <img src={kades.image} alt={kades.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <Users className="w-20 h-20 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">{kades.name}</h2>
              <p className="text-primary font-bold tracking-wide uppercase text-sm mb-6">{kades.position}</p>
              
              <div className="relative">
                <svg className="absolute -top-4 -left-6 w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <div className="text-gray-600 leading-relaxed italic text-lg relative z-10 space-y-4">
                  {(kades.description || "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di Website Resmi Pemerintah Desa.\n\nPuji syukur senantiasa kita panjatkan kehadirat Allah SWT. Di era digital ini, ketersediaan informasi yang cepat, akurat, dan transparan menjadi sebuah kebutuhan mutlak bagi masyarakat.\n\nMelalui portal ini, kami berharap dapat mendekatkan pelayanan publik kepada warga.").split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() !== "" && <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aparatur Pemerintahan Desa */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-heading text-gray-900">Aparatur Desa Lainnya</h2>
          <div className="h-1 flex-1 bg-gray-200 ml-6 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-24 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherOfficials.map((person, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-sm relative bg-gray-100 transition-transform group-hover:scale-105">
                {person.image ? (
                   <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                   <Users className="w-10 h-10 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{person.name}</h3>
              <p className="text-gray-500 text-sm font-medium">{person.position}</p>
            </div>
          ))}
          {otherOfficials.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
              Belum ada data aparatur desa.
            </div>
          )}
        </div>

        {/* Badan Permusyawaratan Desa (BPD) Info */}
        <div className="mt-20 bg-[#0f3d21] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Badan Permusyawaratan Desa (BPD)</h2>
              <p className="text-white/80 leading-relaxed">
                {bpdDeskripsi}
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 w-full md:w-auto">
              <h4 className="font-bold text-lg mb-4 text-accent border-b border-white/10 pb-2">Kontak Sekretariat BPD</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{bpdPhone}</span>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="break-all">{bpdEmail}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
