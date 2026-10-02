import Image from "next/image";
import { BookOpen, History } from "lucide-react";
import { getVillageProfile } from "@/actions/profil";

export default async function SejarahDesa() {
  const profile = await getVillageProfile();

  const defaultSejarah = `Desa Contoh pada awalnya merupakan sebuah kawasan perkampungan kecil yang dihuni oleh beberapa kelompok masyarakat adat. Berdasarkan cerita turun-temurun dari para tetua, nama "Contoh" diambil dari bahasa lokal kuno yang bermakna "Harapan yang Tumbuh", mencerminkan filosofi kehidupan agraris masyarakatnya yang selalu bersyukur atas hasil bumi.\n\nKawasan ini mulai berkembang secara signifikan pada pertengahan abad ke-19, tepatnya pada era kolonial, saat wilayah ini dijadikan salah satu pos perlintasan perdagangan hasil bumi antar daerah. Karena lokasinya yang cukup strategis dan dilewati aliran sungai besar, mulai berdatangan penduduk dari wilayah luar yang akhirnya menetap dan berbaur dengan masyarakat asli.\n\nSecara administratif, Pemerintahan Desa Contoh secara resmi terbentuk pada tahun 1982 melalui Surat Keputusan Gubernur saat itu. Sejak saat itu, Desa Contoh dipimpin oleh Kepala Desa secara demokratis. Peralihan dari sistem masyarakat adat murni menuju sistem pemerintahan desa formal membawa banyak perubahan positif, terutama dalam hal pembangunan infrastruktur jalan, pendidikan, dan kesehatan.`;
  const sejarahText = profile?.sejarah || defaultSejarah;
  
  const defaultTimeline = [
    { year: "Tahun 1910-an", title: "Perkampungan Awal", desc: "Terbentuknya pemukiman awal yang berpusat di dekat bantaran sungai sebagai sumber kehidupan utama warga." },
    { year: "Tahun 1982", title: "Peresmian Desa Definitif", desc: "Ditetapkan secara resmi sebagai wilayah desa yang mandiri secara administratif oleh pemerintah daerah tingkat I." },
    { year: "Tahun 2005", title: "Pemekaran Dusun", desc: "Seiring pertumbuhan populasi, Desa Contoh dimekarkan menjadi 4 wilayah Dusun untuk mempermudah pelayanan warga." },
    { year: "Saat Ini", title: "Desa Mandiri Berbasis Teknologi", desc: "Bertransformasi menjadi desa percontohan yang inovatif, memanfaatkan teknologi pelayanan digital untuk kesejahteraan masyarakat." }
  ];

  let timeline = defaultTimeline;
  if (profile?.timeline) {
    try {
      timeline = JSON.parse(profile.timeline);
    } catch(e) {}
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Sejarah Desa</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Menelusuri jejak langkah perjalanan panjang desa dari awal mula terbentuknya hingga menjadi desa yang maju dan mandiri.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        
        {/* Main Content */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 mb-16">
          <div className="prose prose-lg prose-gray max-w-none text-gray-700 leading-loose">
            {sejarahText.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === "") return null;
              if (index === 0) {
                 return (
                    <p key={index} className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                      {paragraph}
                    </p>
                 )
              }
              // Inject image after second paragraph as a visual break
              if (index === 2) {
                 return (
                    <div key={index}>
                      <figure className="my-10 rounded-2xl overflow-hidden">
                        <Image 
                          src="https://picsum.photos/seed/sejarah1/1000/500" 
                          alt="Suasana Desa Tempo Dulu" 
                          width={1000} 
                          height={500} 
                          className="w-full h-auto object-cover"
                        />
                        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">Ilustrasi kawasan desa di masa lalu</figcaption>
                      </figure>
                      <p>{paragraph}</p>
                    </div>
                 )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-10 flex items-center justify-center">
            <History className="w-6 h-6 mr-3 text-primary" />
            Garis Waktu (Timeline) Sejarah
          </h2>

          <div className="relative border-l-2 border-primary/30 ml-3 md:ml-6 space-y-12">
            {timeline.map((item: any, idx: number) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                <div className="absolute w-6 h-6 bg-primary rounded-full border-4 border-white shadow-sm -left-[13px] top-1"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <span className="text-primary font-bold text-lg mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
