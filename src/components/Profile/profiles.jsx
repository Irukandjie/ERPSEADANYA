import React from 'react';

const Profile = () => {
  return (
    <div className="animate-ios-slide max-w-4xl mx-auto space-y-7 relative transition-colors duration-300">
      
      {/* Kartu Atas - Banner & Avatar */}
      <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden relative transition-colors">
        {/* Banner Gradient */}
        <div className="h-32 md:h-40 bg-gradient-to-r from-sky-400 to-blue-700 dark:from-sky-600 dark:to-blue-900 relative overflow-hidden transition-colors">
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm"></div>
        </div>
        
        {/* Avatar & Info */}
        <div className="px-6 md:px-10 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 md:-mt-16 relative z-10">
            
            {/* Lingkaran Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-lg border border-slate-50 dark:border-slate-700 transition-colors">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-500 dark:to-blue-700 flex items-center justify-center text-white font-black text-3xl md:text-5xl shadow-inner transition-colors">
                AC
              </div>
            </div>
            
            {/* Teks Nama */}
            <div className="text-center md:text-left flex-1 mb-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">Alden Christian</h2>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 transition-colors">Front-End Developer</p>
            </div>
            
            {/* Tombol Aksi */}
            <div className="mb-2">
              <button className="bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Bawah - Informasi Detail */}
      <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 md:p-8 transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-4 transition-colors">Informasi Akun</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 transition-colors">Email</label>
            <p className="font-bold text-slate-700 dark:text-slate-200 transition-colors">aldenchristtw@gmail.com</p>
          </div>
          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 transition-colors">No. Telepon</label>
            <p className="font-bold text-slate-400 dark:text-slate-600 italic transition-colors">Belum diatur</p>
          </div>
          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 transition-colors">Divisi</label>
            <p className="font-bold text-slate-700 dark:text-slate-200 transition-colors">IT / Web Development</p>
          </div>
          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 transition-colors">Status Akun</label>
            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold inline-block border border-emerald-100 dark:border-emerald-500/20 transition-colors">Aktif</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;