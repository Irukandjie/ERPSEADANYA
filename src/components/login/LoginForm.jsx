import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (onLogin) onLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9] p-4 relative overflow-hidden font-sans">
      
      {/* Background Mesh Gradient yang Halus (Sesuai Gambar) */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-white p-10 relative z-10">
        
        {/* Header (Logo + Judul) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-5 shadow-lg shadow-blue-200/50">
            {/* Icon Dollar seperti di gambar */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-[28px] font-black text-slate-800 tracking-tight mb-2">Mini ERP</h2>
          <p className="text-[13px] font-medium text-slate-500">Masuk ke akun perusahaan Anda</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-[13px] font-bold text-slate-600 mb-2 ml-1">Email Perusahaan</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-slate-700 placeholder-slate-400"
                placeholder="admin@perusahaan.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[13px] font-bold text-slate-600 mb-2 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-slate-700 placeholder-slate-400"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Checkbox & Lupa Password */}
          <div className="flex items-center justify-between pt-1 pb-3">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer transition-colors" />
              <label className="ml-2 block text-[13px] font-medium text-slate-500 cursor-pointer">
                Ingat saya
              </label>
            </div>
            <a href="#" className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Lupa password?
            </a>
          </div>

          {/* ========================================= */}
          {/* BUTTON LIQUID GLASS & SHINE HOVER EFFECT  */}
          {/* ========================================= */}
          <button 
            type="submit" 
            className="group relative w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-[0.98] border border-transparent hover:bg-blue-500/70 hover:backdrop-blur-md hover:border-blue-400/50 hover:shadow-[0_8px_30px_0_rgba(37,99,235,0.25)] overflow-hidden"
          >
            {/* Kilauan Cahaya (Shine Sweep) */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            
            <span className="relative z-10 text-[14px]">Masuk Sekarang</span>
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;