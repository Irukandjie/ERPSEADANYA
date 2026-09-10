import React from 'react';

const HeaderLabaRugi = ({ labaBersih, formatRupiah }) => {
  const isProfit = labaBersih >= 0;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-7 transition-colors">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] sm:rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-purple-200/50 dark:shadow-none transition-colors flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="min-w-0 pr-2">
            <h2 className="font-extrabold text-slate-800 dark:text-white text-xl sm:text-2xl tracking-tight transition-colors truncate">Laporan Laba Rugi</h2>
            <p className="text-[11px] sm:text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors truncate">Income Statement Rumah Sakit</p>
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isProfit ? 'from-emerald-500 to-teal-600 shadow-emerald-500/20' : 'from-rose-500 to-red-600 shadow-rose-500/20'} rounded-[1.25rem] p-6 md:p-8 text-white shadow-lg dark:shadow-none relative overflow-hidden mb-7 transition-colors w-full`}>
        {/* KUNCI PERBAIKAN: flex-wrap + w-full biar status bulan ini turun otomatis kalau layarnya sempit */}
        <div className="relative z-10 flex flex-wrap lg:flex-nowrap justify-between items-start lg:items-center gap-4 sm:gap-5 w-full">
          <div className="min-w-0 flex-1">
            <h6 className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-white/80 mb-1.5 md:mb-2 truncate">Net Income (Laba Bersih)</h6>
            {/* Pakai break-words biar angkanya aman sentosa */}
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight break-words">{formatRupiah(labaBersih)}</h3>
          </div>
          <div className="flex flex-row items-center justify-between sm:justify-start gap-2.5 bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-xl border border-white/20 transition-colors w-full lg:w-auto mt-2 lg:mt-0 flex-shrink-0">
            <span className="text-[11px] md:text-xs font-bold text-white/90">Status Bulan Ini:</span>
            <span className="text-sm md:text-base font-black text-white bg-black/20 px-2.5 py-0.5 rounded-md transition-colors">
              {isProfit ? 'PROFIT 📈' : 'RUGI 📉'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLabaRugi;