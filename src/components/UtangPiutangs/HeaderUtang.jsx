import React from 'react';

const HeaderUtang = ({ totalPiutang, totalUtang, onOpenModal, formatRupiah }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-7 transition-colors w-full">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full min-w-0">
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] sm:rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-teal-200/50 dark:shadow-none transition-colors flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-slate-800 dark:text-white text-xl sm:text-2xl tracking-tight transition-colors truncate">Utang & Piutang RS</h2>
            <p className="text-[11px] sm:text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors truncate">Klaim asuransi, vendor farmasi, & fee dokter</p>
          </div>
        </div>

        <button 
          onClick={onOpenModal}
          className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-teal-500 text-white px-5 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] hover:bg-teal-400/90 shadow-md shadow-teal-200/50 dark:shadow-none overflow-hidden flex-shrink-0"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          <span className="relative z-10">Catat Tagihan</span>
        </button>
      </div>

      {/* UPDATE GRID: lg diganti xl biar di iPad tetep numpuk ke bawah */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 mb-7 w-full">
        
        {/* Kartu Total Piutang */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[1.25rem] p-5 sm:p-6 text-white shadow-lg shadow-blue-500/20 dark:shadow-none relative overflow-hidden transition-colors w-full">
          <div className="relative z-10 flex flex-col justify-center h-full min-w-0">
            <h6 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-blue-100 mb-1.5 sm:mb-2 truncate">Total Piutang (Klaim Tertunda)</h6>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight truncate">{formatRupiah(totalPiutang)}</h3>
          </div>
        </div>
        
        {/* Kartu Total Utang */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[1.25rem] p-5 sm:p-6 text-white shadow-lg shadow-rose-500/20 dark:shadow-none relative overflow-hidden transition-colors w-full">
          <div className="relative z-10 flex flex-col justify-center h-full min-w-0">
            <h6 className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-rose-100 mb-1.5 sm:mb-2 truncate">Total Utang (Jatuh Tempo)</h6>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight truncate">{formatRupiah(totalUtang)}</h3>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeaderUtang;