import React from 'react';

const TabelUsers = ({ users }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors duration-300">
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg transition-colors">Daftar Akun Terdaftar</h3>
      </div>
      
      {/* Tampilan Tabel untuk Desktop Besar */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/50 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
              <th className="py-4 px-6">Informasi User</th>
              <th className="py-4 px-6">Hak Akses (Role)</th>
              <th className="py-4 px-6">Status Akun</th>
              <th className="py-4 px-6 text-right">Aktivitas Terakhir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm transition-colors">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-800 dark:text-slate-200 transition-colors">{user.nama}</p>
                    <p className="font-medium text-slate-400 dark:text-slate-500 text-xs mt-0.5 transition-colors">{user.email}</p>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600 dark:text-slate-300 transition-colors">
                    <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-500/20 transition-colors">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold transition-colors ${
                      user.status === 'Aktif' 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' 
                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/50'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-500 dark:text-slate-400 text-xs transition-colors">
                    {user.lastLogin}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium">Belum ada user terdaftar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tampilan List Card untuk Mobile dan Tablet (Seperti S11 Ultra mode potrait) */}
      <div className="block lg:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="p-5 flex flex-col gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
              
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{user.nama}</h4>
                  <p className="font-medium text-slate-400 dark:text-slate-500 text-xs mt-0.5 truncate">{user.email}</p>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold whitespace-nowrap transition-colors ${
                  user.status === 'Aktif' 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' 
                    : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/50'
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="flex justify-between items-end mt-1">
                <div>
                  <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md text-[10px] font-bold border border-blue-100 dark:border-blue-500/20 transition-colors inline-block">
                    {user.role}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Aktivitas Terakhir</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">{user.lastLogin}</p>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium text-sm">Belum ada user terdaftar.</div>
        )}
      </div>

    </div>
  );
};

export default TabelUsers;