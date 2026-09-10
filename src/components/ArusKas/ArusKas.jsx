import React, { useState } from 'react';
import RincianMasuk from './RincianMasuk.jsx';  
import RincianKeluar from './RincianKeluar.jsx'; 
import ModalKasMasuk from './ModalKasMasuk.jsx';   
import ModalKasKeluar from './ModalKasKeluar.jsx'; 
import BukuJurnalRSSL from './bukujurnalrssl.jsx'; 

const ArusKas = ({ transactions, setTransactions, formatRupiah, showToast }) => {
  const [activeTab, setActiveTab] = useState('masuk');
  
  const [isModalMasukOpen, setIsModalMasukOpen] = useState(false);
  const [isModalKeluarOpen, setIsModalKeluarOpen] = useState(false);

  const arusMasuk = transactions.filter(t => t.tipe.includes('Pemasukan') || t.tipe.includes('Debit'));
  const arusKeluar = transactions.filter(t => t.tipe.includes('Pengeluaran') || t.tipe.includes('Kredit'));

  const totalMasuk = arusMasuk.reduce((acc, curr) => acc + curr.jumlah, 0);
  const totalKeluar = arusKeluar.reduce((acc, curr) => acc + curr.jumlah, 0);
  const netKas = totalMasuk - totalKeluar;

  const getKategoriSummary = (trxArray) => {
    const summary = {};
    trxArray.forEach(t => {
      if (!summary[t.kategori]) summary[t.kategori] = 0;
      summary[t.kategori] += t.jumlah;
    });
    return Object.entries(summary).map(([kategori, jumlah]) => ({ kategori, jumlah }));
  };

  const summaryMasuk = getKategoriSummary(arusMasuk);
  const summaryKeluar = getKategoriSummary(arusKeluar);

  const handleSaveTransaction = (formData, type) => {
    let autoKategori = formData.tipe.includes('Pemasukan') || formData.tipe.includes('Debit') ? 'Pendapatan / Modal' : 'Pengeluaran Operasional';
    const newTrx = { 
      id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1, 
      ...formData, 
      kategori: autoKategori,
      jumlah: parseInt(formData.jumlah) 
    };
    
    if (setTransactions) {
      setTransactions([...transactions, newTrx]);
      setActiveTab(type);
      
      if (type === 'masuk') {
        showToast('Kas Masuk berhasil dicatat!');
      } else {
        showToast('Kas Keluar berhasil dicatat!');
      }
    }
  };

  return (
    <div className="animate-ios-slide max-w-6xl mx-auto space-y-6 md:space-y-8 relative w-full overflow-hidden px-1">
      
      <ModalKasMasuk 
        isOpen={isModalMasukOpen} 
        onClose={() => setIsModalMasukOpen(false)} 
        onSubmit={handleSaveTransaction} 
      />
      <ModalKasKeluar 
        isOpen={isModalKeluarOpen} 
        onClose={() => setIsModalKeluarOpen(false)} 
        onSubmit={handleSaveTransaction} 
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 w-full">
        <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-blue-200/50 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-slate-800 dark:text-white text-xl sm:text-2xl tracking-tight transition-colors truncate">Manajemen Arus Kas</h2>
            <p className="text-[11px] sm:text-sm font-medium text-slate-400 dark:text-slate-500 mt-0.5 truncate">Ringkasan perputaran dana, buku jurnal kas & bank</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={() => setIsModalKeluarOpen(true)}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-50/80 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 px-5 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm hover:bg-rose-100/60 dark:hover:bg-rose-500/20 hover:border-rose-300/80 dark:hover:border-rose-500/30 overflow-hidden active:scale-[0.97] flex-shrink-0"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4m8-8l-8 8 8 8" transform="rotate(45 12 12)"/></svg>
            <span className="relative z-10 whitespace-nowrap">Kas Keluar</span>
          </button>

          <button 
            onClick={() => setIsModalMasukOpen(true)}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-5 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] border border-transparent hover:shadow-[0_8px_25px_0_rgba(16,185,129,0.3)] overflow-hidden flex-shrink-0"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            <span className="relative z-10 whitespace-nowrap">Kas Masuk</span>
          </button>
        </div>
      </div>

      <div className={`rounded-[1.25rem] p-5 sm:p-6 md:p-8 border shadow-sm relative overflow-hidden transition-colors w-full ${netKas >= 0 ? 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30' : 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/30'}`}>
        {/* KUNCI PERBAIKAN: flex-wrap biar di iPad dia otomatis nurunin kotak Total Transaksi ke bawah (nggak maksa nyempit) */}
        <div className="relative z-10 flex flex-wrap lg:flex-nowrap justify-between items-start lg:items-center gap-4 sm:gap-5 w-full">
          <div className="min-w-0 flex-1">
            <h6 className={`text-[10px] md:text-xs font-extrabold uppercase tracking-widest mb-1.5 md:mb-2 truncate ${netKas >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {netKas >= 0 ? 'Kenaikan Kas Bersih' : 'Penurunan Kas Bersih'}
            </h6>
            {/* Cabut break-words biar angkanya utuh (nggak jatuh) */}
            <h3 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight leading-tight truncate">{formatRupiah(netKas)}</h3>
          </div>
          <div className="flex flex-row items-center justify-between sm:justify-start gap-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 md:px-5 md:py-3 rounded-xl shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-colors w-full lg:w-auto mt-2 lg:mt-0 flex-shrink-0">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400">Total Transaksi:</span>
            <span className="text-sm md:text-base font-black text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 rounded-md transition-colors">{transactions.length}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2 w-full">
        <div className="bg-slate-100/60 dark:bg-slate-800/60 backdrop-blur-md p-1.5 rounded-[1rem] flex w-full max-w-sm relative shadow-inner border border-slate-200/60 dark:border-slate-700/60 transition-colors">
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-700 rounded-[0.75rem] shadow-sm border border-slate-100 dark:border-slate-600 transition-transform duration-300 ease-out"
            style={{ transform: activeTab === 'masuk' ? 'translateX(0)' : 'translateX(100%)', left: '6px' }}
          ></div>

          <button 
            onClick={() => setActiveTab('masuk')}
            className={`relative z-10 px-2 py-2.5 text-[11px] sm:text-sm font-bold rounded-xl transition-colors duration-300 w-1/2 flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'masuk' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors flex-shrink-0 ${activeTab === 'masuk' ? 'bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
            <span className="truncate">Rincian Masuk</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('keluar')}
            className={`relative z-10 px-2 py-2.5 text-[11px] sm:text-sm font-bold rounded-xl transition-colors duration-300 w-1/2 flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'keluar' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors flex-shrink-0 ${activeTab === 'keluar' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
            <span className="truncate">Rincian Keluar</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden min-h-[200px] transition-colors w-full">
        <div key={activeTab} className="animate-ios-slide flex-1">
          {activeTab === 'masuk' ? (
            <RincianMasuk summaryMasuk={summaryMasuk} totalMasuk={totalMasuk} formatRupiah={formatRupiah} />
          ) : (
            <RincianKeluar summaryKeluar={summaryKeluar} totalKeluar={totalKeluar} formatRupiah={formatRupiah} />
          )}
        </div>
      </div>

      <div className="w-full">
        <BukuJurnalRSSL 
          transactions={transactions} 
          setTransactions={setTransactions} 
          formatRupiah={formatRupiah} 
        />
      </div>

    </div>
  );
};

export default ArusKas;