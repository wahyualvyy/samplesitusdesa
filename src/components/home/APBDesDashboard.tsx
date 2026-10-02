"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { getApbdesList } from "@/actions/statistik";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function APBDesDashboard() {
  const [apbData, setApbData] = useState<any[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    async function loadData() {
      const data = await getApbdesList();
      if (data && data.length > 0) {
        setApbData(data);
        setYear(data[0].year); // default to latest
      }
    }
    loadData();
  }, []);

  const data = apbData.find(d => d.year === year) || {
    pendapatan: 0,
    belanja: 0,
    pembiayaan: 0,
    categories: []
  };

  const surplus = (data.pendapatan || 0) + (data.pembiayaan || 0) - (data.belanja || 0);
  
  // Format categories for chart
  const categoriesForChart = (data.categories || []).map((cat: any, index: number) => {
    const colors = ["#15803D", "#4B5563", "#14532D", "#D4A017", "#1E40AF"];
    return {
      name: cat.name,
      amount: cat.amount,
      color: colors[index % colors.length]
    };
  });

  return (
    <section className="py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Transparansi APB Desa</h2>
            <p className="text-muted-foreground">
              Bentuk keterbukaan informasi publik mengenai Anggaran Pendapatan dan Belanja Desa Contoh. 
              Mewujudkan tata kelola keuangan yang transparan dan akuntabel.
            </p>
          </div>
          
          <div className="mt-6 lg:mt-0 flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Pilih Tahun:</span>
            <div className="bg-white border border-border/60 p-1 rounded-xl flex space-x-1 shadow-sm">
              {apbData.map((d) => (
                <button 
                  key={d.year}
                  onClick={() => setYear(d.year)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${year === d.year ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-muted"}`}
                >
                  {d.year}
                </button>
              ))}
              {apbData.length === 0 && (
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white shadow">{year}</button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full translate-x-8 -translate-y-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">Pendapatan Desa</p>
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{formatRupiah(data.pendapatan)}</h3>
              <div className="flex items-center space-x-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>Target Tercapai</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full translate-x-8 -translate-y-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">Belanja Desa</p>
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{formatRupiah(data.belanja)}</h3>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(data.belanja / (data.pendapatan || 1)) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full translate-x-8 -translate-y-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">Pembiayaan</p>
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <PiggyBank className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{formatRupiah(data.pembiayaan)}</h3>
              <div className="flex items-center space-x-1 text-xs font-medium text-muted-foreground">
                <span>Penerimaan & Pengeluaran</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full translate-x-8 -translate-y-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-muted-foreground">Surplus / (Defisit)</p>
                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                  {surplus >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{formatRupiah(surplus)}</h3>
              <div className="flex items-center space-x-1 text-xs font-medium text-amber-600">
                <span>Kondisi Keuangan Stabil</span>
              </div>
            </div>
          </div>

        </div>

        {/* Chart Area */}
        {categoriesForChart.length > 0 && (
          <div className="bg-white border border-border/60 p-6 md:p-8 rounded-2xl shadow-sm mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h3 className="font-heading font-bold text-xl">Proporsi Belanja Desa {year}</h3>
              <Link href="/data-desa/apb-desa" className="inline-flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary/80 mt-2 md:mt-0">
                <span>Lihat Laporan Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoriesForChart}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5EAE7" />
                  <XAxis type="number" tickFormatter={(value) => `Rp${(value / 1000000).toFixed(0)}Jt`} tick={{ fill: '#647067', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={180} tick={{ fill: '#17201B', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    cursor={{ fill: '#F8FAF9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(value: any) => [formatRupiah(value), 'Nilai Belanja']}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                    {categoriesForChart.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
