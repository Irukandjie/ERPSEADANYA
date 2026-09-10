import React from 'react';

const SectionHPP = ({ data, totalHPP, labaKotor, formatRupiah, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden mb-6 transition-colors">
      <div className="p-4 sm:p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/80 transition-colors">
        <h3 className="font-black text-slate-800 dark:text-white text-base sm:text-lg">2. Harga Pokok Layanan (HPP)</h3>
      </div>
      
      <div className="p-4 sm:p-5 md:p-6 space-y-6">
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Bahan Baku & Medis</h4>
          <ul className="space-y-1.5">
            {data.bahanBaku.map((item, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600/50 gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] flex-shrink-0"></div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-4 sm:pl-0 mt-1 sm:mt-0">
                  <span className="font-black sm:font-bold text-rose-500 dark:text-rose-400 text-base sm:text-base">({formatRupiah(item.nilai)})</span>
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item, 'bahanBaku')} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors bg-blue-50 sm:bg-transparent" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(item, 'bahanBaku')} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors bg-rose-50 sm:bg-transparent" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Tenaga Kerja Langsung</h4>
          <ul className="space-y-1.5">
            {data.tenagaKerja.map((item, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600/50 gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0"></div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-4 sm:pl-0 mt-1 sm:mt-0">
                  <span className="font-black sm:font-bold text-rose-500 dark:text-rose-400 text-base sm:text-base">({formatRupiah(item.nilai)})</span>
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item, 'tenagaKerja')} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors bg-blue-50 sm:bg-transparent" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(item, 'tenagaKerja')} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors bg-rose-50 sm:bg-transparent" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 bg-rose-50/50 dark:bg-rose-900/10 transition-colors">
        <span className="font-black text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm pl-2">Total HPP</span>
        <span className="font-black sm:font-bold text-rose-600 dark:text-rose-400 pr-2 pl-2 sm:pl-0 text-lg sm:text-base">({formatRupiah(totalHPP)})</span>
      </div>

      <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 transition-colors">
        <div className="pl-1">
          <span className="font-black text-blue-800 dark:text-blue-400 uppercase tracking-wide text-xs sm:text-sm block">Laba Kotor (Gross Profit)</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-blue-600/70 dark:text-blue-500 mt-0.5 block">Pendapatan dikurangi HPP</span>
        </div>
        <span className="font-black text-blue-700 dark:text-blue-300 text-2xl sm:text-xl pl-1 sm:pl-0">{formatRupiah(labaKotor)}</span>
      </div>
    </div>
  );
};

export default SectionHPP;