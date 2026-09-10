import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalStyles = `
  @keyframes modalPopScale { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes backdropFadeIn { 0% { opacity: 0; backdrop-filter: blur(0px); } 100% { opacity: 1; backdrop-filter: blur(8px); } }
  .animate-modal-pop { animation: modalPopScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-backdrop { animation: backdropFadeIn 0.3s ease-out forwards; }
`;

const ModalKasMasuk = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ tanggal: '', deskripsi: '', tipe: '', jumlah: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      setFormData({ tanggal: today, deskripsi: '', tipe: 'Pemasukan Kas - Tunai', jumlah: '' });
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jumlah || formData.jumlah <= 0) return;
    onSubmit(formData, 'masuk');
    onClose();
  };

  return createPortal(
    <>
      <style>{modalStyles}</style>

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 animate-backdrop backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative z-10 bg-white dark:bg-slate-800 w-full max-w-5xl rounded-[1.75rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-700 animate-modal-pop overflow-hidden transition-colors">
          
          <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-blue-50/50 dark:bg-slate-800/80 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[1rem] bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200/60 dark:shadow-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
              </div>
              <h2 className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white">Catat Kas Masuk</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full transition-all shadow-sm border border-slate-200/60 dark:border-slate-600 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 md:p-8 bg-white dark:bg-slate-800 transition-colors">
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-end gap-5">
              <div className="w-full lg:w-[15%]">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-0.5">Tanggal</label>
                <input type="date" name="tanggal" required value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" style={{ colorScheme: 'auto' }} />
              </div>
              
              <div className="w-full lg:w-[35%]">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-0.5">Keterangan / Deskripsi</label>
                <input type="text" name="deskripsi" placeholder="Cth: Terima Pembayaran Client" required value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" />
              </div>

              <div className="w-full lg:w-[20%]">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-0.5">Tipe (Sesuai Kolom)</label>
                <select name="tipe" required value={formData.tipe} onChange={(e) => setFormData({...formData, tipe: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500">
                  <optgroup label="BUKU KAS" className="dark:bg-slate-800">
                    <option value="Pemasukan Kas - Tunai">Kas Tunai</option>
                    <option value="Pemasukan Kas - Bank">Kas Bank</option>
                  </optgroup>
                  <optgroup label="BUKU BANK (DEBIT/MASUK)" className="dark:bg-slate-800">
                    <option value="Panin - Debit">Panin (+)</option>
                    <option value="BCA - Debit">BCA (+)</option>
                    <option value="Mandiri - Debit">Mandiri (+)</option>
                    <option value="BSI - Debit">BSI (+)</option>
                    <option value="BNI - Debit">BNI (+)</option>
                    <option value="BRI - Debit">BRI (+)</option>
                  </optgroup>
                </select>
              </div>

              <div className="w-full lg:w-[15%]">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-0.5">Nominal (Rp)</label>
                <input type="number" name="jumlah" placeholder="0" required min="1" value={formData.jumlah} onChange={(e) => setFormData({...formData, jumlah: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" />
              </div>

              <div className="w-full lg:w-[15%]">
                <button type="submit" className="group relative w-full bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[15px] font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] border border-transparent hover:shadow-[0_8px_25px_0_rgba(37,99,235,0.25)] overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <span className="relative z-10">Simpan Data</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalKasMasuk;