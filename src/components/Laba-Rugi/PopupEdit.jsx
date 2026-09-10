import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const PopupEdit = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ id: null, nama: '', nilai: '', kategori: '' });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nilai || formData.nilai <= 0) return;
    onSubmit({ ...formData, nilai: parseInt(formData.nilai) });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60 transition-opacity" onClick={onClose}></div>
      
      <div className="relative z-10 bg-white dark:bg-slate-800 w-full max-w-[420px] rounded-[1.75rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden transform scale-100 transition-all">
        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/20 flex justify-between items-center">
          <h3 className="font-black text-xl text-blue-900 dark:text-blue-400">Edit Data Laba Rugi</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Nama Item</label>
            <input type="text" required value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500" />
          </div>
          
          <div>
            <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Kategori Bagian</label>
            <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500">
              <optgroup label="Pendapatan">
                <option value="operasional">Pendapatan Operasional</option>
                <option value="nonOperasional">Pendapatan Non-Operasional</option>
              </optgroup>
              <optgroup label="HPP">
                <option value="bahanBaku">Bahan Baku & Medis</option>
                <option value="tenagaKerja">Tenaga Kerja Langsung</option>
              </optgroup>
              <optgroup label="OPEX">
                <option value="pegawai">Beban Pegawai</option>
                <option value="umum">Beban Umum & Admin</option>
                <option value="penyusutan">Biaya Penyusutan</option>
              </optgroup>
              <optgroup label="Luar Usaha">
                <option value="beban">Beban Keuangan/Bunga</option>
                <option value="pajak">Pajak (Tax)</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Nilai (Rp)</label>
            <input type="number" required min="1" value={formData.nilai} onChange={(e) => setFormData({...formData, nilai: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500" />
          </div>

          <div className="pt-3">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PopupEdit;