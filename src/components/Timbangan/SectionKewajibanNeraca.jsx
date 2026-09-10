import React from 'react';

const SectionKewajibanNeraca = ({ data, totalKewajiban, formatRupiah }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors">
      <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">Kewajiban (Liabilitas)</h3>
      </div>
      
      <div className="p-5 space-y-6">
        <div>
          <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-2">Jangka Pendek</h4>
          <ul className="space-y-1">
            {data.pendek.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group">
                <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                <span className="font-black text-rose-500 dark:text-rose-400">{formatRupiah(item.nilai)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center transition-colors">
        <span className="font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide text-xs pl-2">Total Kewajiban</span>
        <span className="font-black text-rose-600 dark:text-rose-400 text-base">{formatRupiah(totalKewajiban)}</span>
      </div>
    </div>
  );
};

export default SectionKewajibanNeraca;