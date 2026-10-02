import { Leaf } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating dashed ring */}
        <div className="absolute w-28 h-28 border-4 border-primary/20 border-dashed rounded-full animate-[spin_4s_linear_infinite]"></div>
        
        {/* Middle pulsing ring */}
        <div className="absolute w-20 h-20 border-4 border-primary/40 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        
        {/* Inner pulsing box */}
        <div className="absolute w-14 h-14 bg-primary/10 rounded-2xl rotate-45 animate-pulse"></div>
        
        {/* Center Logo/Icon */}
        <div className="relative bg-gradient-to-tr from-primary to-emerald-400 text-white p-3.5 rounded-2xl shadow-xl shadow-primary/30 animate-bounce" style={{ animationDuration: '1.5s' }}>
          <Leaf className="w-7 h-7" />
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-12 flex flex-col items-center">
        <h3 className="text-lg font-heading font-bold text-gray-800 tracking-widest uppercase">
          Memuat Data
        </h3>
        <div className="flex space-x-1.5 mt-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
