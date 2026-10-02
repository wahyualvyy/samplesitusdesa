"use client";

import { Users, User, UserCheck, UsersRound, Baby, Briefcase, GraduationCap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { useEffect, useState } from "react";
import { getResidentDemographics } from "@/actions/penduduk";

const defaultAgeData = [
  { age: '0-14', jumlah: 250 },
  { age: '15-24', jumlah: 320 },
  { age: '25-34', jumlah: 380 },
  { age: '35-44', jumlah: 850 },
  { age: '45-54', jumlah: 500 },
  { age: '55+', jumlah: 150 },
];

const defaultGenderData = [
  { name: 'Laki-Laki', value: 1250, color: '#3b82f6' },
  { name: 'Perempuan', value: 1200, color: '#ec4899' },
];

const defaultEducationData = [
  { name: 'SD', count: 0 },
  { name: 'SMP', count: 0 },
  { name: 'SMA/SMK', count: 0 },
];

const defaultJobData = [
  { name: 'Belum Terdata', count: 0 }
];

export default function StatistikPenduduk() {
  const [stats, setStats] = useState({ total: 0, laki: 0, perempuan: 0, kk: 0, year: 2026 });
  const [genderData, setGenderData] = useState(defaultGenderData);
  const [ageData, setAgeData] = useState(defaultAgeData);
  const [educationData, setEducationData] = useState<{name: string, count: number}[]>(defaultEducationData);
  const [jobData, setJobData] = useState<{name: string, count: number}[]>(defaultJobData);

  useEffect(() => {
    async function loadData() {
      const data = await getResidentDemographics();
      if (data) {
        setStats({
          total: data.totalPenduduk,
          laki: data.lakiLaki,
          perempuan: data.perempuan,
          kk: data.kepalaKeluarga,
          year: data.year
        });
        setGenderData([
          { name: 'Laki-Laki', value: data.lakiLaki, color: '#3b82f6' },
          { name: 'Perempuan', value: data.perempuan, color: '#ec4899' },
        ]);
        setAgeData(data.ageDistribution);
        if (data.educationDistribution) setEducationData(data.educationDistribution);
        if (data.jobDistribution) setJobData(data.jobDistribution);
      }
    }
    loadData();
  }, []);

  const totalPercentage = stats.total > 0 ? stats.total : 1; // avoid div by 0

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-[#0f3d21] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <UsersRound className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Statistik Kependudukan</h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Data terpadu demografi penduduk Desa Contoh berdasarkan usia, jenis kelamin, pendidikan, dan mata pencaharian (Update terakhir: Tahun {stats.year}).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Total Penduduk</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900 mt-1">{stats.total.toLocaleString("id-ID")}</h3>
            <p className="text-xs text-gray-400 mt-1">Jiwa</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <User className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Laki-Laki</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900 mt-1">{stats.laki.toLocaleString("id-ID")}</h3>
            <p className="text-xs text-gray-400 mt-1">Jiwa ({Math.round((stats.laki / totalPercentage) * 100)}%)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-3">
              <User className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Perempuan</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900 mt-1">{stats.perempuan.toLocaleString("id-ID")}</h3>
            <p className="text-xs text-gray-400 mt-1">Jiwa ({Math.round((stats.perempuan / totalPercentage) * 100)}%)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3">
              <UserCheck className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Kepala Keluarga</p>
            <h3 className="text-3xl font-heading font-bold text-gray-900 mt-1">{stats.kk.toLocaleString("id-ID")}</h3>
            <p className="text-xs text-gray-400 mt-1">KK</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Piramida Penduduk (Bar Chart) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-gray-900 mb-6 flex items-center">
              <Baby className="w-5 h-5 mr-2 text-primary" />
              Kelompok Usia Penduduk
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="jumlah" fill="#0f3d21" radius={[0, 4, 4, 0]} barSize={24} name="Jumlah Penduduk" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rasio Jenis Kelamin (Pie Chart) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-gray-900 mb-6 flex items-center">
              <UsersRound className="w-5 h-5 mr-2 text-primary" />
              Rasio Jenis Kelamin
            </h3>
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-gray-900">{stats.total.toLocaleString("id-ID")}</span>
                  <span className="block text-xs text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Pendidikan & Pekerjaan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-heading font-bold text-xl text-gray-900 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                Tingkat Pendidikan
              </h3>
            </div>
            <div className="p-0 flex-1">
              <table className="w-full text-sm text-left">
                <tbody>
                  {educationData.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">{item.name}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">{item.count} Orang</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-heading font-bold text-xl text-gray-900 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                Mata Pencaharian
              </h3>
            </div>
            <div className="p-0 flex-1">
              <table className="w-full text-sm text-left">
                <tbody>
                  {jobData.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">{item.name}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        {totalPercentage > 1 ? Math.round((item.count / totalPercentage) * 100) : 0}% 
                        <span className="text-gray-400 text-xs ml-1">({item.count})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
