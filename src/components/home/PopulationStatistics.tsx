"use client";

import { Users, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { getResidentDemographics } from "@/actions/penduduk";

const defaultGenderData = [
  { name: "Laki-laki", value: 1750, color: "#14532D" },
  { name: "Perempuan", value: 1706, color: "#D4A017" },
];

const defaultAgeData = [
  { age: "0-14", jumlah: 850 },
  { age: "15-24", jumlah: 520 },
  { age: "25-34", jumlah: 610 },
  { age: "35-44", jumlah: 490 },
  { age: "45-54", jumlah: 410 },
  { age: "55+", jumlah: 576 }, 
];

const defaultStats = [
  { title: "Total Penduduk", value: "3.456", unit: "Jiwa", icon: Users, color: "text-primary" },
  { title: "Laki-laki", value: "1.750", unit: "Jiwa", icon: Users, color: "text-blue-600" },
  { title: "Perempuan", value: "1.706", unit: "Jiwa", icon: Users, color: "text-rose-500" },
  { title: "Kepala Keluarga", value: "842", unit: "KK", icon: Activity, color: "text-amber-600" },
];

export default function PopulationStatistics() {
  const [stats, setStats] = useState(defaultStats);
  const [genderData, setGenderData] = useState(defaultGenderData);
  const [ageDataState, setAgeDataState] = useState(defaultAgeData);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    async function loadData() {
      const data = await getResidentDemographics();
      if (data) {
        setYear(data.year);
        setStats([
          { title: "Total Penduduk", value: data.totalPenduduk.toLocaleString('id-ID'), unit: "Jiwa", icon: Users, color: "text-primary" },
          { title: "Laki-laki", value: data.lakiLaki.toLocaleString('id-ID'), unit: "Jiwa", icon: Users, color: "text-blue-600" },
          { title: "Perempuan", value: data.perempuan.toLocaleString('id-ID'), unit: "Jiwa", icon: Users, color: "text-rose-500" },
          { title: "Kepala Keluarga", value: data.kepalaKeluarga.toLocaleString('id-ID'), unit: "KK", icon: Activity, color: "text-amber-600" },
        ]);
        setGenderData([
          { name: "Laki-laki", value: data.lakiLaki, color: "#14532D" },
          { name: "Perempuan", value: data.perempuan, color: "#D4A017" },
        ]);
        setAgeDataState(data.ageDistribution);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-20 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Demografi & Statistik Desa</h2>
            <p className="text-muted-foreground max-w-2xl">
              Data kependudukan Desa Contoh yang terus diperbarui secara berkala untuk transparansi dan perencanaan pembangunan yang lebih baik.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm font-medium px-4 py-2 bg-muted text-muted-foreground rounded-lg">
            Tahun Data: {year}
          </div>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-heading font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm font-medium text-muted-foreground">{stat.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Gender Chart */}
          <div className="bg-card border border-border/60 p-6 md:p-8 rounded-2xl shadow-sm">
            <h3 className="font-heading font-bold text-lg mb-6">Distribusi Berdasarkan Jenis Kelamin</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value) => [`${value} Jiwa`, 'Jumlah']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age Chart */}
          <div className="bg-card border border-border/60 p-6 md:p-8 rounded-2xl shadow-sm">
            <h3 className="font-heading font-bold text-lg mb-6">Distribusi Berdasarkan Kelompok Umur</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageDataState} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EAE7" />
                  <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fill: '#647067', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#647067', fontSize: 12 }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#F8FAF9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(value) => [`${value} Jiwa`, 'Jumlah']}
                  />
                  <Bar dataKey="jumlah" fill="#15803D" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
