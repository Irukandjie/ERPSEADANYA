import React from 'react';

const RincianKeluar = ({ summaryKeluar, totalKeluar, formatRupiah }) => {
  return (
    <div>
      <div className="bg-rose-50/30 dark:bg-rose-900/10 border-b border-slate-100 dark:border-slate-700/50 p-5 md:p-6 flex justify-between items-center transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">Histori Arus Kas Keluar</h3>
        <span className="text-base font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-3 py-1 rounded-lg transition-colors">
          -{formatRupiah(totalKeluar)}
        </span>
      </div>
      <div className="p-2">
        {summaryKeluar.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
             <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
             <p className="text-sm font-medium">Belum ada arus kas keluar.</p>
           </div>
        ) : (
          <ul className="divide-y divide-slate-50 dark:divide-slate-700/30 transition-colors">
            {summaryKeluar.map((item, index) => (
              <li key={index} className="flex justify-between items-center px-4 md:px-6 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-rose-100/50 dark:bg-rose-500/20 p-2.5 rounded-lg text-rose-500 dark:text-rose-400">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{item.kategori}</span>
                </div>
                <span className="text-base font-black text-slate-800 dark:text-white">{formatRupiah(item.jumlah)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RincianKeluar;