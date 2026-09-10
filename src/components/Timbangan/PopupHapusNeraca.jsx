import React from 'react';
import { createPortal } from 'react-dom';

const PopupHapusNeraca = ({ isOpen, onClose, onConfirm, dataHapus }) => {
  if (!isOpen || !dataHapus) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60 transition-opacity" onClick={onClose}></div>
      <div className="relative z-10 bg-white dark:bg-slate-800 w-full max-w-[380px] rounded-[1.75rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden transform scale-100 transition-all text-center p-7">
        
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Hapus dari Neraca?</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Yakin mau menghapus <strong className="text-slate-700 dark:text-slate-300">"{dataHapus.nama}"</strong>? Jika dihapus, pastikan nilai Timbangan Neraca tetap <strong>Balance</strong>.
        </p>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl transition-colors">Batal</button>
          <button onClick={() => { onConfirm(dataHapus.id, dataHapus.kategori); onClose(); }} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-rose-500/20">Ya, Hapus</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PopupHapusNeraca;