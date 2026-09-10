import React from 'react';

const TabelAset = ({ daftarAset, formatRupiah }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors duration-300">
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg transition-colors">Daftar Inventaris Aset</h3>
      </div>
      
      {/* TAMPILAN 1: TABEL FULL UNTUK PC (Layar Besar) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/50 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
              <th className="py-4 px-6">Nama Aset</th>
              <th className="py-4 px-6">Klasifikasi Kategori</th>
              <th className="py-4 px-6">Tanggal Perolehan</th>
              <th className="py-4 px-6">Kondisi</th>
              <th className="py-4 px-6 text-right">Nilai Perolehan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm transition-colors">
            {daftarAset.length > 0 ? (
              daftarAset.map((aset) => {
                
                const parts = aset.kategori.split(' - ');
                const mainCategory = parts.length > 1 ? parts[0] : 'Kategori Umum';
                const subCategory = parts.length > 1 ? parts[1] : aset.kategori;

                let badgeClass = "bg-slate-50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/50";
                if (mainCategory.includes('Lancar')) {
                  badgeClass = "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20";
                } else if (mainCategory.includes('Tetap')) {
                  badgeClass = "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20";
                } else if (mainCategory.includes('Tak Berwujud')) {
                  badgeClass = "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-500/20";
                } else if (mainCategory.includes('Investasi')) {
                  badgeClass = "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20";
                }

                return (
                  <tr key={aset.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">{aset.nama}</td>
                    
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest transition-colors ${badgeClass}`}>
                          {mainCategory}
                        </span>
                        <span className="font-bold text-slate-600 dark:text-slate-400 text-[13px] transition-colors">
                          {subCategory}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400">{aset.tanggalPerolehan}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold transition-colors ${
                        aset.kondisi === 'Baik' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' : 
                        aset.kondisi === 'Rusak' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20' :
                        'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-500/20'
                      }`}>
                        {aset.kondisi}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-800 dark:text-white">{formatRupiah(aset.nilaiPerolehan)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium">Belum ada data aset tercatat.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TAMPILAN 2: LIST CARD UNTUK TABLET/HP (Layar Sempit kayak S11 lu) */}
      <div className="block lg:hidden flex-col divide-y divide-slate-100 dark:divide-slate-700/50 transition-colors">
        {daftarAset.length > 0 ? (
          daftarAset.map((aset) => {
            const parts = aset.kategori.split(' - ');
            const mainCategory = parts.length > 1 ? parts[0] : 'Kategori Umum';
            const subCategory = parts.length > 1 ? parts[1] : aset.kategori;

            let badgeClass = "bg-slate-50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-600/50";
            if (mainCategory.includes('Lancar')) {
              badgeClass = "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20";
            } else if (mainCategory.includes('Tetap')) {
              badgeClass = "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20";
            } else if (mainCategory.includes('Tak Berwujud')) {
              badgeClass = "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-500/20";
            } else if (mainCategory.includes('Investasi')) {
              badgeClass = "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20";
            }

            return (
              <div key={aset.id} className="p-4 sm:p-5 flex flex-col gap-3 hover:bg-slate-50/30 dark:hover:bg-slate-700/20 transition-colors">
                
                {/* Baris Atas: Kategori Utama & Kondisi */}
                <div className="flex justify-between items-start gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest transition-colors ${badgeClass}`}>
                    {mainCategory}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold whitespace-nowrap transition-colors ${
                    aset.kondisi === 'Baik' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' : 
                    aset.kondisi === 'Rusak' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20' :
                    'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-500/20'
                  }`}>
                    {aset.kondisi}
                  </span>
                </div>
                
                {/* Baris Tengah: Nama Aset & Sub-Kategori */}
                <div className="flex flex-col items-start gap-0.5">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-[15px] leading-tight transition-colors">{aset.nama}</h4>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">{subCategory}</p>
                </div>
                
                {/* Baris Bawah: Tanggal & Nilai Perolehan */}
                <div className="flex justify-between items-end mt-1 pt-3 border-t border-slate-50 dark:border-slate-700/30">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-colors">Tgl. Perolehan</p>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors">{aset.tanggalPerolehan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-colors mb-0.5">Nilai Perolehan</p>
                    <p className="font-black text-slate-800 dark:text-white text-base transition-colors">{formatRupiah(aset.nilaiPerolehan)}</p>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium text-sm">Belum ada data aset tercatat.</div>
        )}
      </div>

    </div>
  );
};

export default TabelAset;