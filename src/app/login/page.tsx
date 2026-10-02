"use client";

import { useState, useTransition } from "react";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await login(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Gagal login.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>

      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl flex overflow-hidden relative z-10">
        
        {/* Left Side: Branding / Info */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0f3d21] p-12 text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center space-x-3 mb-12 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="font-heading font-bold text-xl">DK</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-wide">Desa Contoh</span>
            </Link>
            
            <h1 className="text-4xl font-heading font-bold leading-tight mb-6">
              Sistem Informasi<br />Manajemen Desa
            </h1>
            <p className="text-white/80 leading-relaxed text-lg">
              Portal terpadu untuk mengelola seluruh data kependudukan, pelaporan warga, dan administrasi digital Desa Contoh.
            </p>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-4">
              <ShieldCheck className="w-10 h-10 text-green-300 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Akses Terbatas</h4>
                <p className="text-sm text-white/70">Area ini khusus untuk Perangkat Desa dan Administrator sistem.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-sm mx-auto h-full flex flex-col justify-center">
            
            {/* Mobile Branding (Visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">Admin Login</h2>
            </div>

            <div className="hidden lg:block mb-10">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">Selamat Datang</h2>
              <p className="text-gray-500">Silakan login ke akun pengelola Anda.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start space-x-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@desacontoh.go.id" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi...
                  </span>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Gunakan kredensial:<br />
                Email: <span className="text-gray-600 font-mono font-bold">admin@simoketawang.id</span><br />
                Password: <span className="text-gray-600 font-mono font-bold">admin123</span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
