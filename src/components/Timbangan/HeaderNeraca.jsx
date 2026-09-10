import React from 'react';

const HeaderNeraca = ({ totalAset, totalPasiva, formatRupiah }) => {
  const isBalance = totalAset === totalPasiva;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-7 transition-colors">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-12 h-12 rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-blue-200/50 dark:shadow-none transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          </div>
          <div>
            <h2 className="font-extrabold text-slate-800 dark:text-white text-2xl tracking-tight transition-colors">Neraca Keuangan</h2>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors">Laporan Posisi Keuangan Terkini</p>
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isBalance ? 'from-blue-600 to-indigo-700 shadow-blue-500/20' : 'from-rose-500 to-red-600 shadow-rose-500/20'} rounded-[1.25rem] p-7 md:p-8 text-white shadow-lg dark:shadow-none relative overflow-hidden mb-7 transition-colors`}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1 w-full">
            <h6 className="text-[10px] font-extrabold uppercase tracking-widest text-white/80 mb-2">Total Aset (Harta)</h6>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">{formatRupiah(totalAset)}</h3>
          </div>

          <div className="hidden md:flex flex-col items-center px-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${isBalance ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300' : 'border-rose-300 bg-rose-400/30 text-white'}`}>
              <span className="text-xl font-black">{isBalance ? '=' : '≠'}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest mt-2 bg-black/20 px-3 py-1 rounded-full">{isBalance ? 'BALANCE' : 'UNBALANCED'}</span>
          </div>

          <div className="flex-1 w-full md:text-right">
            <h6 className="text-[10px] font-extrabold uppercase tracking-widest text-white/80 mb-2">Kewajiban + Ekuitas (Pasiva)</h6>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">{formatRupiah(totalPasiva)}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNeraca;