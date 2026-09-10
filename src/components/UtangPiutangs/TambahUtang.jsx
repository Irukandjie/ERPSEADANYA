import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalStyles = `
  @keyframes modalPopScale { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes backdropFadeIn { 0% { opacity: 0; backdrop-filter: blur(0px); } 100% { opacity: 1; backdrop-filter: blur(8px); } }
  .animate-modal-pop { animation: modalPopScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-backdrop { animation: backdropFadeIn 0.3s ease-out forwards; }
`;

const ModalTambahUtang = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    namaPihak: '', kategori: 'Piutang - BPJS Kesehatan', jatuhTempo: '', jumlah: '', status: 'Belum Lunas'
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        namaPihak: '', kategori: 'Piutang - BPJS Kesehatan', 
        jatuhTempo: new Date().toISOString().split('T')[0], 
        jumlah: '', status: 'Belum Lunas'
      });
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaPihak || !formData.jumlah) return;
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return createPortal(
    <>
      <style>{modalStyles}</style>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-slate-900/40 animate-backdrop" onClick={onClose}></div>
        <div className="relative z-10 bg-white/90 backdrop-blur-3xl w-full max-w-[460px] rounded-[1.75rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-white/80 animate-modal-pop overflow-hidden">
          
          <div className="p-6 border-b border-slate-100/50 bg-teal-50/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-[1rem] bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-200/60">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
               </div>
               <div>
                  <h3 className="font-black text-xl text-teal-900 tracking-tight leading-tight">Catat Tagihan</h3>
                  <p className="text-[10px] font-bold text-teal-600/70 mt-0.5">Form Hutang Piutang RS</p>
               </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 font-bold active:scale-95 transition-all">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Nama Vendor / Keterangan</label>
              <input type="text" name="namaPihak" placeholder="Cth: Klaim BPJS Agt / PT Kimia Farma" required value={formData.namaPihak} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Kategori Transaksi</label>
              <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                
                <optgroup label="PIUTANG (Uang RS yang Masih Nyangkut)">
                  <option value="Piutang - BPJS Kesehatan">Piutang BPJS Kesehatan</option>
                  <option value="Piutang - Asuransi Swasta">Piutang Asuransi Swasta</option>
                  <option value="Piutang - Korporat (Perusahaan)">Piutang Korporat (Perusahaan)</option>
                  <option value="Piutang - Pasien Umum">Piutang Pasien Umum</option>
                </optgroup>
                
                <optgroup label="UTANG (Kewajiban RS ke Pihak Lain)">
                  <option value="Utang - Suplier Farmasi (PBF)">Utang Suplier Farmasi (PBF)</option>
                  <option value="Utang - Vendor Operasional Khusus">Utang Vendor Operasional Khusus</option>
                  <option value="Utang - Jasa Medis (Fee Dokter)">Utang Jasa Medis (Fee Dokter)</option>
                  <option value="Utang - Pengadaan Alkes">Utang Pengadaan Alkes</option>
                </optgroup>

              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Jatuh Tempo</label>
                <input type="date" name="jatuhTempo" required value={formData.jatuhTempo} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wide mb-1.5 ml-0.5">Nominal (Rp)</label>
              <input type="number" name="jumlah" placeholder="0" required min="1" value={formData.jumlah} onChange={handleChange} className="w-full px-4 py-3 bg-white/50 border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
            </div>

            <div className="pt-3">
              <button type="submit" className="group relative w-full bg-teal-500 hover:bg-teal-400 text-white text-[15px] font-extrabold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] border border-transparent hover:shadow-[0_8px_25px_0_rgba(20,184,166,0.4)] overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <span className="relative z-10">Simpan Tagihan</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </>,
    document.body
  );
};

export default ModalTambahUtang;