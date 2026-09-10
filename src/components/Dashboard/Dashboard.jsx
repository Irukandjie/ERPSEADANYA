import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar.jsx'; 
import ArusKas from '../ArusKas/ArusKas.jsx';
import ChartGrafik from './chart.jsx';
import ChartAset from './ChartAset.jsx';   
import ChartUtang from './ChartUtang.jsx'; 
import SuccessToast from '../Animasi/SuccessToast.jsx';
import ScrollNav from '../Animasi/ScrollNav.jsx';
import Aset from '../Barang/Aset.jsx';
import Users from '../user/Users.jsx'; 
import Profile from '../Profile/profiles.jsx'; 
import UtangPiutang from '../UtangPiutangs/UtangPiutang.jsx'; 
import LabaRugi from '../Laba-Rugi/LabaRugi.jsx';
import Neraca from '../Timbangan/Neraca.jsx';

const Dashboard = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [toast, setToast] = useState({ isOpen: false, message: '' });
  
  const [isDarkMode, setIsDarkMode] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('tema-erp') === 'dark' : false);
  const [isTransitioning, setIsTransitioning] = useState(true); 
  const [nextTheme, setNextTheme] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('tema-erp') === 'dark' ? 'dark' : 'light') : 'light');

  useEffect(() => {
    const root = document.documentElement; 
    isDarkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('tema-erp', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 950);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleTheme = () => {
    if (isTransitioning) return; 
    const goingToDark = !isDarkMode;
    setNextTheme(goingToDark ? 'dark' : 'light');
    setIsTransitioning(true); 
    setTimeout(() => setIsDarkMode(goingToDark), 400);
    setTimeout(() => setIsTransitioning(false), 950); 
  };

  const [transactions, setTransactions] = useState([
    { id: 1, tanggal: '2026-09-01', deskripsi: 'Modal Awal', tipe: 'Pemasukan Kas - Tunai', kategori: 'Modal', jumlah: 2000000000 },
    { id: 2, tanggal: '2026-09-05', deskripsi: 'Pembelian Aset RS', tipe: 'Pengeluaran Kas - Tunai', kategori: 'Investasi', jumlah: 975000000 },
    { id: 3, tanggal: '2026-09-10', deskripsi: 'Pembayaran Beban Operasional', tipe: 'Pengeluaran Kas - Tunai', kategori: 'Operasional', jumlah: 100000000 },
    { id: 4, tanggal: '2026-09-15', deskripsi: 'Pembayaran Pasien Tunai', tipe: 'Pemasukan Kas - Tunai', kategori: 'Operasional', jumlah: 50000000 }
  ]);

  const [daftarAset, setDaftarAset] = useState([
    { id: 1, nama: 'Gedung Kantor Utama', kategori: 'Aset Tetap - Properti & Lahan', tanggalPerolehan: '2024-01-10', nilaiPerolehan: 750000000, kondisi: 'Baik' },
    { id: 2, nama: 'Kendaraan Operasional Box', kategori: 'Aset Tetap - Kendaraan Operasional', tanggalPerolehan: '2023-06-20', nilaiPerolehan: 180000000, kondisi: 'Baik' },
    { id: 3, nama: 'Laptop Operasional (5 Unit)', kategori: 'Aset Tetap - Inventaris Kantor', tanggalPerolehan: '2025-03-15', nilaiPerolehan: 45000000, kondisi: 'Baik' }
  ]);

  const [daftarTagihan, setDaftarTagihan] = useState([
    { id: 1, namaPihak: 'Klaim BPJS - Rawat Jalan Sept', kategori: 'Piutang - BPJS Kesehatan', jatuhTempo: '2026-10-15', jumlah: 450000000, status: 'Belum Lunas' },
    { id: 2, namaPihak: 'PT Enseval Medika Prima', kategori: 'Utang - Suplier Farmasi (PBF)', jatuhTempo: '2026-09-28', jumlah: 85000000, status: 'Belum Lunas' },
    { id: 3, namaPihak: 'Jasa Visite dr. SP.PD', kategori: 'Utang - Jasa Medis (Fee Dokter)', jatuhTempo: '2026-09-15', jumlah: 15000000, status: 'Belum Lunas' }
  ]);

  const [dataLR, setDataLR] = useState({
    pendapatan: { operasional: [{ id: 'p1', nama: 'Tagihan Pasien', nilai: 500000000 }], nonOperasional: [] },
    hpp: { bahanBaku: [{ id: 'h1', nama: 'Obat & Farmasi', nilai: 75000000 }], tenagaKerja: [{ id: 'h2', nama: 'Honor Dokter', nilai: 25000000 }] },
    opex: { pegawai: [{ id: 'o1', nama: 'Gaji Karyawan', nilai: 65000000 }], umum: [{ id: 'o2', nama: 'Listrik & Air', nilai: 35000000 }], penyusutan: [] },
    luarUsaha: { beban: [], pajak: [] }
  });

  const showToast = (message) => { setToast({ isOpen: false, message: '' }); setTimeout(() => setToast({ isOpen: true, message }), 50); };
  const totalPemasukan = transactions.filter(t => t.tipe.includes('Pemasukan') || t.tipe.includes('Debit')).reduce((acc, curr) => acc + curr.jumlah, 0);
  const totalPengeluaran = transactions.filter(t => t.tipe.includes('Pengeluaran') || t.tipe.includes('Kredit')).reduce((acc, curr) => acc + curr.jumlah, 0);
  const saldo = totalPemasukan - totalPengeluaran;
  const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);

  return (
    <>
      {isTransitioning && (
        <div className={`celestial-overlay animate-sky-elegant ${nextTheme === 'dark' ? 'dark-sky' : 'light-sky'}`}>
          <div className="animate-celestial-elegant">
            {nextTheme === 'dark' ? (
              <svg className="w-28 h-28 md:w-36 md:h-36 text-indigo-100 drop-shadow-[0_0_40px_rgba(199,210,254,0.3)]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-28 h-28 md:w-36 md:h-36 text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.4)]" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
            )}
          </div>
        </div>
      )}

      <div className="flex h-screen font-sans overflow-hidden bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <SuccessToast isOpen={toast.isOpen} message={toast.message} onClose={() => setToast({ ...toast, isOpen: false })} />
        <ScrollNav />
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        <div className="flex-1 flex flex-col h-[100dvh] overflow-y-auto relative">
          <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 px-5 md:px-8 py-4 flex justify-between items-center shadow-sm transition-colors duration-300">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white capitalize tracking-tight transition-colors">{activeMenu.replace('-', ' ')}</h2>
            <div className="flex items-center gap-3">
              <button onClick={handleToggleTheme} className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 flex items-center justify-center">
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
              <button onClick={onLogout} className="bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-500 transition-all p-2.5 rounded-xl border border-rose-200 dark:border-rose-500/20 shadow-sm active:scale-95 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          </nav>

          <div className="p-4 sm:p-5 pb-28 md:p-8 md:pb-8">
            <style>{`@keyframes iosSlideIn { 0% { opacity: 0; transform: translateX(25px) scale(0.99); } 100% { opacity: 1; transform: translateX(0) scale(1); } } .animate-ios-slide { animation: iosSlideIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }`}</style>

            <div key={activeMenu} className="animate-ios-slide max-w-[1600px] mx-auto">
              {activeMenu === 'dashboard' ? (
                <>
                  {/* Grid System 3 Kolom */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 mb-8">
                    
                    {/* Kartu 1: Total Saldo */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors duration-300 overflow-hidden flex items-center">
                      <div className="flex justify-between items-center gap-2 w-full relative z-10">
                        <div className="min-w-0 flex-1 pr-1">
                          <h6 className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 truncate">Total Saldo</h6>
                          {/* KUNCI: whitespace-nowrap biar nggak turun, lg:text-lg biar mengecil pas di layar nanggung */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-xl 2xl:text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                            {formatRupiah(saldo)}
                          </h3>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Kartu 2: Pemasukan */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors duration-300 overflow-hidden flex items-center">
                      <div className="flex justify-between items-center gap-2 w-full relative z-10">
                        <div className="min-w-0 flex-1 pr-1">
                          <h6 className="text-emerald-500 dark:text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 truncate">Pemasukan</h6>
                          {/* KUNCI: whitespace-nowrap biar nggak turun, lg:text-lg biar mengecil pas di layar nanggung */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-xl 2xl:text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                            {formatRupiah(totalPemasukan)}
                          </h3>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Kartu 3: Pengeluaran */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors duration-300 lg:col-span-1 overflow-hidden flex items-center">
                      <div className="flex justify-between items-center gap-2 w-full relative z-10">
                        <div className="min-w-0 flex-1 pr-1">
                          <h6 className="text-rose-500 dark:text-rose-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 truncate">Pengeluaran</h6>
                          {/* KUNCI: whitespace-nowrap biar nggak turun, lg:text-lg biar mengecil pas di layar nanggung */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-xl 2xl:text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                            {formatRupiah(totalPengeluaran)}
                          </h3>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-rose-50 dark:bg-rose-500/20 text-rose-500 dark:text-rose-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  <ChartGrafik transactions={transactions} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    <ChartAset formatRupiah={formatRupiah} />
                    <ChartUtang formatRupiah={formatRupiah} />
                  </div>
                </>
              ) : activeMenu === 'arus-kas' ? (
                <ArusKas transactions={transactions} setTransactions={setTransactions} formatRupiah={formatRupiah} showToast={showToast} />
              ) : activeMenu === 'aset' ? (
                <Aset daftarAset={daftarAset} setDaftarAset={setDaftarAset} formatRupiah={formatRupiah} showToast={showToast} />
              ) : activeMenu === 'users' ? (
                <Users showToast={showToast} />
              ) : activeMenu === 'profile' ? (
                <Profile />
              ) : activeMenu === 'utang-piutang' ? (
                <UtangPiutang daftarTagihan={daftarTagihan} setDaftarTagihan={setDaftarTagihan} formatRupiah={formatRupiah} showToast={showToast} />
              ) : activeMenu === 'laba-rugi' ? (
                <LabaRugi dataLR={dataLR} setDataLR={setDataLR} formatRupiah={formatRupiah} />
              ) : activeMenu === 'neraca' ? (
                <Neraca transactions={transactions} daftarAset={daftarAset} daftarTagihan={daftarTagihan} dataLR={dataLR} formatRupiah={formatRupiah} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;