import React from 'react';

const HeaderNeraca = ({ totalAset, totalPasiva, formatRupiah }) => {
  const isBalance = totalAset === totalPasiva;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-7 transition-colors">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] sm:rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-blue-200/50 dark:shadow-none transition-colors flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          </div>
          <div className="min-w-0 pr-2 flex-1">
            <h2 className="font-extrabold text-slate-800 dark:text-white text-xl sm:text-2xl tracking-tight transition-colors truncate">Neraca Keuangan</h2>
            <p className="text-[11px] sm:text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors truncate">Laporan Posisi Keuangan Terkini</p>
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isBalance ? 'from-blue-600 to-indigo-700 shadow-blue-500/20' : 'from-rose-500 to-red-600 shadow-rose-500/20'} rounded-[1.25rem] p-5 sm:p-6 md:p-8 text-white shadow-lg dark:shadow-none relative overflow-hidden mb-7 transition-colors`}>
        
        {/* UPDATE KUNCI: Ubah lg jadi xl biar di iPad dia tetep numpuk ke bawah (gak maksa ke samping) */}
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 xl:gap-6">
          
          {/* Bagian Atas/Kiri: Total Aset */}
          <div className="flex-1 w-full min-w-0">
            <h6 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white/80 mb-1.5 sm:mb-2 truncate">Total Aset (Harta)</h6>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight truncate">{formatRupiah(totalAset)}</h3>
          </div>

          {/* Bagian Tengah: Indikator Balance */}
          {/* Kalau di tablet, dia jadi flex-row horizontal. Kalo di desktop, balik jadi flex-col vertikal */}
          <div className="flex flex-row xl:flex-col items-center justify-start xl:justify-center gap-3 xl:gap-0 py-4 xl:py-0 px-0 xl:px-6 w-full xl:w-auto border-y border-white/20 xl:border-y-0 xl:border-x xl:border-white/20 my-1 xl:my-0 flex-shrink-0">
            <div className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center border-2 xl:border-4 ${isBalance ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300' : 'border-rose-300 bg-rose-400/30 text-white'}`}>
              <span className="text-lg xl:text-xl font-black">{isBalance ? '=' : '≠'}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest xl:mt-2 bg-black/20 px-3 py-1.5 xl:py-1 rounded-full">{isBalance ? 'BALANCE' : 'UNBALANCED'}</span>
          </div>

          {/* Bagian Bawah/Kanan: Kewajiban + Ekuitas */}
          <div className="flex-1 w-full xl:text-right min-w-0">
            <h6 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white/80 mb-1.5 sm:mb-2 truncate">Kewajiban + Ekuitas (Pasiva)</h6>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight truncate">{formatRupiah(totalPasiva)}</h3>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HeaderNeraca;