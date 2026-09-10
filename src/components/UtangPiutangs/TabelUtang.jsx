import React from 'react';

const TabelUtang = ({ daftarTagihan, formatRupiah }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors duration-300">
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center transition-colors">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-lg transition-colors">Daftar Tagihan & Klaim</h3>
      </div>
      
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700/50 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
              <th className="py-4 px-6">Nama Pihak / Keterangan</th>
              <th className="py-4 px-6">Jenis Transaksi</th>
              <th className="py-4 px-6">Jatuh Tempo</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Nominal (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm transition-colors">
            {daftarTagihan.length > 0 ? (
              daftarTagihan.map((item) => {
                const parts = item.kategori.split(' - ');
                const jenisTagihan = parts[0]; 
                const spesifik = parts[1];

                let badgeClass = jenisTagihan === 'Piutang' 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20"
                  : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20";

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800 dark:text-slate-200 transition-colors">{item.namaPihak}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest transition-colors ${badgeClass}`}>
                          {jenisTagihan}
                        </span>
                        <span className="font-bold text-slate-600 dark:text-slate-400 text-[12px] transition-colors">{spesifik}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-slate-400 transition-colors">{item.jatuhTempo}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold transition-colors ${
                        item.status === 'Lunas' 
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' 
                          : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={`py-4 px-6 text-right font-black transition-colors ${jenisTagihan === 'Piutang' ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {formatRupiah(item.jumlah)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium">Belum ada data tagihan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col divide-y divide-slate-100 dark:divide-slate-700/50 transition-colors">
        {daftarTagihan.length > 0 ? (
          daftarTagihan.map((item) => {
            const parts = item.kategori.split(' - ');
            const jenisTagihan = parts[0]; 
            const spesifik = parts[1];
            
            let badgeClass = jenisTagihan === 'Piutang' 
              ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20"
              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/20";

            return (
              <div key={item.id} className="p-5 flex flex-col gap-3 hover:bg-slate-50/30 dark:hover:bg-slate-700/20 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest transition-colors ${badgeClass}`}>
                      {jenisTagihan}
                    </span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[15px] leading-tight transition-colors">{item.namaPihak}</h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold whitespace-nowrap transition-colors ${
                    item.status === 'Lunas' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-end mt-1">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 transition-colors">{spesifik}</p>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 transition-colors">Jatuh Tempo: {item.jatuhTempo}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm transition-colors ${jenisTagihan === 'Piutang' ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {formatRupiah(item.jumlah)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-slate-400 dark:text-slate-500 font-medium">Belum ada data tagihan.</div>
        )}
      </div>

    </div>
  );
};

export default TabelUtang;