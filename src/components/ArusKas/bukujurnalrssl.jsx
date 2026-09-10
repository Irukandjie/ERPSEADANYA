import React, { useMemo } from 'react';
import ExcelTools from './ExcelTools.jsx';

const BukuJurnalRSSL = ({ transactions, setTransactions, formatRupiah }) => {
  const banks = ['Panin', 'BCA', 'Mandiri', 'BSI', 'BNI', 'BRI'];

  const processedTransactions = useMemo(() => {
    let saldoKas = 0;
    let saldoBank = { Panin: 0, BCA: 0, Mandiri: 0, BSI: 0, BNI: 0, BRI: 0 };

    return transactions.map((trx) => {
      if (trx.tipe.includes('Pemasukan Kas')) {
        saldoKas += trx.jumlah;
      } else if (trx.tipe.includes('Pengeluaran Kas')) {
        saldoKas -= trx.jumlah;
      }

      banks.forEach((bank) => {
        if (trx.tipe === `${bank} - Debit`) {
          saldoBank[bank] += trx.jumlah;
        } else if (trx.tipe === `${bank} - Kredit`) {
          saldoBank[bank] -= trx.jumlah;
        }
      });

      return {
        ...trx,
        saldoKasBerjalan: saldoKas,
        saldoBankBerjalan: { ...saldoBank }
      };
    });
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 w-full overflow-hidden transition-colors">
      
      {/* Header Tabel: flex-col di mobile biar tombol import/export turun rapi */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-800/80 transition-colors w-full">
        <div>
          <h2 className="font-extrabold text-slate-800 dark:text-white text-lg tracking-tight">Buku Kas & Bank</h2>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3">
          <ExcelTools transactions={transactions} setTransactions={setTransactions} />
        </div>
      </div>

      {/* Kontainer Tabel: INI YANG BIKIN TABEL BISA DI-SCROLL KE KANAN TANPA MERUSAK LAYOUT */}
      <div className="w-full overflow-x-auto relative">
        <table className="w-full min-w-[1800px] lg:min-w-[2400px] text-left border-collapse bg-white dark:bg-slate-800 transition-colors">
          <thead className="bg-slate-100 dark:bg-slate-900/50 text-[10px] font-extrabold uppercase text-slate-700 dark:text-slate-300 tracking-wider text-center border-b-2 border-slate-300 dark:border-slate-700">
            {/* TINGKAT 1: Judul Utama */}
            <tr>
              <th rowSpan="3" className="px-3 py-2 border border-slate-300 dark:border-slate-700 align-middle w-10 bg-slate-200 dark:bg-slate-800">No</th>
              <th rowSpan="3" className="px-3 py-2 border border-slate-300 dark:border-slate-700 align-middle w-28 bg-slate-200 dark:bg-slate-800">Tanggal</th>
              <th rowSpan="3" className="px-4 py-2 border border-slate-300 dark:border-slate-700 align-middle w-56 lg:w-64 bg-slate-200 dark:bg-slate-800">Keterangan</th>
              
              <th colSpan="4" className="px-4 py-2 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400">Buku Kas</th>
              <th rowSpan="3" className="px-4 py-2 border border-slate-300 dark:border-slate-700 align-middle bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 w-32">Saldo Kas</th>
              
              <th colSpan="18" className="px-4 py-2 border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">Buku Bank</th>
            </tr>
            
            {/* TINGKAT 2: Sub-Kategori */}
            <tr>
              <th colSpan="2" className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10">Pemasukan</th>
              <th colSpan="2" className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10">Pengeluaran</th>
              
              {banks.map(bank => (
                <React.Fragment key={bank}>
                  <th colSpan="2" className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/10">{bank}</th>
                  <th rowSpan="2" className="px-2 py-1 border border-slate-300 dark:border-slate-700 align-middle bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 w-28 lg:w-32">Saldo</th>
                </React.Fragment>
              ))}
            </tr>
            
            {/* TINGKAT 3: Detail Pemasukan/Pengeluaran & Debit/Kredit */}
            <tr>
              <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10 w-28">Tunai</th>
              <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10 w-28">Bank</th>
              <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10 w-28">Tunai</th>
              <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10 w-28">Obat</th>

              {banks.map(bank => (
                <React.Fragment key={`${bank}-dk`}>
                  <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/10 w-28">Debit</th>
                  <th className="px-2 py-1 border border-slate-300 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/10 w-28">Kredit</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* ISI TABEL */}
          <tbody className="text-[11px] font-medium text-slate-600 dark:text-slate-400 divide-y divide-slate-200 dark:divide-slate-700">
            {processedTransactions.length === 0 ? (
              <tr>
                <td colSpan="27" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">Belum ada transaksi bro.</td>
              </tr>
            ) : (
              processedTransactions.map((trx, index) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-center font-bold text-slate-500 dark:text-slate-400">{index + 1}</td>
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-center whitespace-nowrap">{trx.tanggal}</td>
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 font-extrabold text-slate-800 dark:text-slate-200 min-w-[200px]">{trx.deskripsi}</td>

                  {/* BUKU KAS */}
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{trx.tipe === 'Pemasukan Kas - Tunai' ? formatRupiah(trx.jumlah) : '-'}</td>
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">{trx.tipe === 'Pemasukan Kas - Bank' ? formatRupiah(trx.jumlah) : '-'}</td>
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-rose-500 dark:text-rose-400 font-bold whitespace-nowrap">{trx.tipe === 'Pengeluaran Kas - Tunai' ? formatRupiah(trx.jumlah) : '-'}</td>
                  <td className="px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-rose-500 dark:text-rose-400 font-bold whitespace-nowrap">{trx.tipe === 'Pengeluaran Kas - Obat' ? formatRupiah(trx.jumlah) : '-'}</td>
                  
                  {/* SALDO KAS */}
                  <td className={`px-3 py-3 border border-slate-200 dark:border-slate-700/50 text-right font-black whitespace-nowrap bg-emerald-50/50 dark:bg-emerald-900/10 ${trx.saldoKasBerjalan < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-800 dark:text-emerald-300'}`}>
                    {formatRupiah(trx.saldoKasBerjalan)}
                  </td>

                  {/* BUKU BANK */}
                  {banks.map(bank => (
                    <React.Fragment key={`${bank}-${trx.id}`}>
                      <td className="px-2 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">{trx.tipe === `${bank} - Debit` ? formatRupiah(trx.jumlah) : '-'}</td>
                      <td className="px-2 py-3 border border-slate-200 dark:border-slate-700/50 text-right text-rose-500 dark:text-rose-400 font-bold whitespace-nowrap">{trx.tipe === `${bank} - Kredit` ? formatRupiah(trx.jumlah) : '-'}</td>
                      
                      {/* SALDO BANK MASING-MASING */}
                      <td className={`px-2 py-3 border border-slate-200 dark:border-slate-700/50 text-right font-black whitespace-nowrap bg-blue-50/50 dark:bg-blue-900/10 ${trx.saldoBankBerjalan[bank] < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-blue-800 dark:text-blue-300'}`}>
                        {formatRupiah(trx.saldoBankBerjalan[bank])}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BukuJurnalRSSL;