import React from 'react';

const SectionOpex = ({ data, totalOpex, labaOperasional, formatRupiah, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden mb-6 transition-colors">
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/80 transition-colors">
        <h3 className="font-black text-slate-800 dark:text-white text-lg">3. Beban Operasional (OPEX)</h3>
      </div>
      
      <div className="p-5 md:p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Beban Pegawai</h4>
          <ul className="space-y-1.5">
            {data.pegawai.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600/50">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-rose-500 dark:text-rose-400">({formatRupiah(item.nilai)})</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item, 'pegawai')} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(item, 'pegawai')} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Beban Umum & Administrasi</h4>
          <ul className="space-y-1.5">
            {data.umum.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600/50">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-rose-500 dark:text-rose-400">({formatRupiah(item.nilai)})</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item, 'umum')} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(item, 'umum')} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Biaya Penyusutan</h4>
          <ul className="space-y-1.5">
            {data.penyusutan.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-600/50">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">{item.nama}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-rose-500 dark:text-rose-400">({formatRupiah(item.nilai)})</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item, 'penyusutan')} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => onDelete(item, 'penyusutan')} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg transition-colors" title="Hapus">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-t border-purple-100 dark:border-purple-800/30 flex justify-between items-center transition-colors">
        <div className="pl-1">
          <span className="font-black text-purple-800 dark:text-purple-400 uppercase tracking-wide text-sm block">Laba Operasional</span>
          <span className="text-[10px] font-bold text-purple-600/70 dark:text-purple-500 mt-0.5">Keuntungan murni roda bisnis</span>
        </div>
        <span className="font-black text-purple-700 dark:text-purple-300 text-xl">{formatRupiah(labaOperasional)}</span>
      </div>
    </div>
  );
};

export default SectionOpex;