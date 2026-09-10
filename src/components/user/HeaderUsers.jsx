import React from 'react';

const HeaderUsers = ({ totalUsers, activeUsers, onOpenModal }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-7 transition-colors">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-blue-200/50 dark:shadow-none transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-extrabold text-slate-800 dark:text-white text-2xl tracking-tight transition-colors">Manajemen Users</h2>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors">Kelola akses dan daftar staf pengguna</p>
          </div>
        </div>

        <button 
          onClick={onOpenModal}
          className="group relative flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] hover:bg-blue-500/90 shadow-md shadow-blue-200/50 dark:shadow-none overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          <span className="relative z-10">Tambah User</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[1.25rem] p-7 md:p-8 text-white shadow-lg shadow-blue-500/20 dark:shadow-none relative overflow-hidden mb-7 transition-colors">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <div>
            <h6 className="text-xs font-extrabold uppercase tracking-widest text-blue-100 mb-2">Total Pengguna Sistem</h6>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">{totalUsers} <span className="text-2xl font-bold opacity-80">Akun</span></h3>
          </div>
          <div className="flex items-center gap-2.5 bg-white/20 dark:bg-slate-900/30 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 dark:border-slate-700/50 transition-colors">
            <span className="text-xs font-bold text-blue-50">Sedang Aktif:</span>
            <span className="text-base font-black text-white bg-blue-800/40 dark:bg-blue-900/60 px-2.5 py-0.5 rounded-md transition-colors">
              {activeUsers} User
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderUsers;