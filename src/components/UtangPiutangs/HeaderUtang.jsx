import React from 'react';

const HeaderUtang = ({ totalPiutang, totalUtang, onOpenModal, formatRupiah }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-7 transition-colors">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 w-12 h-12 rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-teal-200/50 dark:shadow-none transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h2 className="font-extrabold text-slate-800 dark:text-white text-2xl tracking-tight transition-colors">Utang & Piutang RS</h2>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 transition-colors">Klaim asuransi, vendor farmasi, & fee dokter</p>
          </div>
        </div>

        <button 
          onClick={onOpenModal}
          className="group relative flex items-center justify-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] hover:bg-teal-400/90 shadow-md shadow-teal-200/50 dark:shadow-none overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          <span className="relative z-10">Catat Tagihan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[1.25rem] p-6 text-white shadow-lg shadow-blue-500/20 dark:shadow-none relative overflow-hidden transition-colors">
          <div className="relative z-10">
            <h6 className="text-[11px] font-extrabold uppercase tracking-widest text-blue-100 mb-2">Total Piutang (Klaim Tertunda)</h6>
            <h3 className="text-3xl font-black tracking-tight">{formatRupiah(totalPiutang)}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[1.25rem] p-6 text-white shadow-lg shadow-rose-500/20 dark:shadow-none relative overflow-hidden transition-colors">
          <div className="relative z-10">
            <h6 className="text-[11px] font-extrabold uppercase tracking-widest text-rose-100 mb-2">Total Utang (Jatuh Tempo)</h6>
            <h3 className="text-3xl font-black tracking-tight">{formatRupiah(totalUtang)}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderUtang;