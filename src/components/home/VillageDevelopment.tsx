import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import prisma from "@/lib/prisma";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default async function VillageDevelopment() {
  const projects = await prisma.developmentProject.findMany({
    take: 6,
    orderBy: { id: "desc" }
  });

  return (
    <section className="py-20 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Pembangunan Desa</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pantau progress kegiatan infrastruktur dan pembangunan di Desa Contoh secara transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.status === "Selesai" ? "bg-green-100 text-green-700" : 
                  project.status === "Berjalan" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {project.status === "Selesai" ? <CheckCircle2 className="inline w-3 h-3 mr-1" /> : <Clock className="inline w-3 h-3 mr-1" />}
                  {project.status}
                </span>
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">{project.year}</span>
              </div>
              
              <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-6 flex-grow">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-4 h-4 shrink-0 mt-0.5 text-primary/60 font-bold text-center">Rp</span>
                  <span>{formatRupiah(project.budget)}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" />
                  <span>Sumber: {project.fundingSource}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-foreground">Progress</span>
                  <span className={project.progress === 100 ? "text-green-600" : "text-primary"}>{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${project.progress === 100 ? "bg-green-500" : "bg-primary"}`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              Belum ada data proyek pembangunan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
