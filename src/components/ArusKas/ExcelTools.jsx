import React, { useRef } from 'react';
import * as XLSX from 'xlsx';

const ExcelTools = ({ transactions, setTransactions }) => {
  const fileRef = useRef(null);

  const handleExport = () => {
    if (transactions.length === 0) {
      alert("Data kosong, ga ada yang bisa di-export bro!");
      return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal_Akuntansi");
    
    XLSX.writeFile(workbook, "Data_Jurnal_Mini_ERP.xlsx");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      if (importedData.length > 0) {
        const startId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) : 0;
        
        const formattedData = importedData.map((item, index) => ({
          id: startId + index + 1,
          tanggal: item.tanggal || new Date().toISOString().split('T')[0],
          deskripsi: item.deskripsi || item.Keterangan || 'Imported Data',
          kategori: item.kategori || item.Kategori || 'Lain-lain',
          tipe: item.tipe || item.Tipe || 'Debit',
          jumlah: parseInt(item.jumlah || item.Nominal) || 0
        }));
        
        setTransactions([...transactions, ...formattedData]);
        alert(`Sukses! ${formattedData.length} data berhasil masuk ke sistem.`);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = null;
  };

  return (
    <div className="flex gap-2">
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        ref={fileRef} 
        onChange={handleImport} 
        className="hidden" 
      />
      
      <button 
        onClick={() => fileRef.current.click()}
        className="group relative flex items-center gap-1.5 bg-emerald-50/80 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm hover:bg-emerald-100/60 dark:hover:bg-emerald-500/20 hover:border-emerald-300/80 dark:hover:border-emerald-500/50 overflow-hidden active:scale-[0.97]"
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        <span className="relative z-10">Import</span>
      </button>
      
      <button 
        onClick={handleExport}
        className="group relative flex items-center gap-1.5 bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm hover:bg-blue-100/60 dark:hover:bg-blue-500/20 hover:border-blue-300/80 dark:hover:border-blue-500/50 overflow-hidden active:scale-[0.97]"
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        <span className="relative z-10">Export</span>
      </button>
    </div>
  );
};

export default ExcelTools;