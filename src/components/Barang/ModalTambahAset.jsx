import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalStyles = `
  @keyframes modalPopScale { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes backdropFadeIn { 0% { opacity: 0; backdrop-filter: blur(0px); } 100% { opacity: 1; backdrop-filter: blur(8px); } }
  .animate-modal-pop { animation: modalPopScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-backdrop { animation: backdropFadeIn 0.3s ease-out forwards; }
`;

const ModalTambahAset = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama: '', kategori: 'Aset Tetap - Inventaris Kantor', tanggalPerolehan: '', nilaiPerolehan: '', kondisi: 'Baik'
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama: '', kategori: 'Aset Tetap - Inventaris Kantor', 
        tanggalPerolehan: new Date().toISOString().split('T')[0], 
        nilaiPerolehan: '', kondisi: 'Baik'
      });
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nilaiPerolehan) return;
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return createPortal(
    <>
      <style>{modalStyles}</style>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 animate-backdrop backdrop-blur-sm transition-colors" onClick={onClose}></div>
        <div className="relative z-10 bg-white/95 dark:bg-slate-800 backdrop-blur-3xl w-full max-w-[460px] rounded-[1.75rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-white/80 dark:border-slate-700 animate-modal-pop overflow-hidden transition-colors">
          
          <div className="p-6 border-b border-slate-100/50 dark:border-slate-700/80 bg-blue-50/50 dark:bg-slate-800/90 flex justify-between items-center transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-[1rem] bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200/60 dark:shadow-none">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
               </div>
               <div>
                  <h3 className="font-black text-xl text-blue-900 dark:text-white tracking-tight leading-tight transition-colors">Tambah Aset</h3>
                  <p className="text-[10px] font-bold text-blue-600/70 dark:text-blue-400 mt-0.5 transition-colors">Pendataan Harta Perusahaan</p>
               </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 font-bold active:scale-95 transition-all">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-0.5">Nama Aset / Barang</label>
              <input type="text" name="nama" placeholder="Cth: Meja Kantor Jati" required value={formData.nama} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400 dark:placeholder-slate-500" />
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-0.5">Klasifikasi Kategori</label>
              <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                <optgroup label="ASET LANCAR (Gampang Dicairkan)" className="dark:bg-slate-800">
                  <option value="Aset Lancar - Kas & Bank">Kas & Bank</option>
                  <option value="Aset Lancar - Piutang Usaha">Piutang Usaha</option>
                  <option value="Aset Lancar - Persediaan (Stok)">Persediaan (Stok)</option>
                  <option value="Aset Lancar - Uang Muka">Uang Muka / Dibayar di Muka</option>
                </optgroup>
                <optgroup label="ASET TETAP (Fisik Jangka Panjang)" className="dark:bg-slate-800">
                  <option value="Aset Tetap - Properti & Lahan">Properti & Lahan</option>
                  <option value="Aset Tetap - Kendaraan Operasional">Kendaraan Operasional</option>
                  <option value="Aset Tetap - Mesin & Peralatan">Mesin & Peralatan Khusus</option>
                  <option value="Aset Tetap - Inventaris Kantor">Inventaris Kantor</option>
                </optgroup>
                <optgroup label="ASET TAK BERWUJUD" className="dark:bg-slate-800">
                  <option value="Aset Tak Berwujud - Lisensi & Sistem">Lisensi & Sistem IT</option>
                  <option value="Aset Tak Berwujud - Kekayaan Intelektual">Kekayaan Intelektual</option>
                  <option value="Aset Tak Berwujud - Hak Franchise">Hak Franchise</option>
                </optgroup>
                <optgroup label="INVESTASI JANGKA PANJANG" className="dark:bg-slate-800">
                  <option value="Investasi - Surat Berharga">Surat Berharga (Saham/Obligasi)</option>
                  <option value="Investasi - Deposito">Deposito Berjangka</option>
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-0.5">Tanggal Perolehan</label>
                <input type="date" name="tanggalPerolehan" required value={formData.tanggalPerolehan} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all" style={{ colorScheme: 'auto' }} />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-0.5">Kondisi Fisik</label>
                <select name="kondisi" value={formData.kondisi} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <option value="Baik">Baik</option>
                  <option value="Perawatan">Perawatan Berkala</option>
                  <option value="Rusak">Rusak / Void</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-0.5">Nilai Perolehan (Rp)</label>
              <input type="number" name="nilaiPerolehan" placeholder="0" required min="1" value={formData.nilaiPerolehan} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>

            <div className="pt-3">
              <button type="submit" className="group relative w-full bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[15px] font-extrabold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] border border-transparent hover:shadow-[0_8px_25px_0_rgba(37,99,235,0.4)] dark:hover:shadow-none overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <span className="relative z-10">Simpan Catatan Aset</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalTambahAset;