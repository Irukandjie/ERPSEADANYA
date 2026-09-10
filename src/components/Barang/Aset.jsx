import React, { useState } from 'react';
import HeaderAset from './HeaderAset.jsx';
import TabelAset from './TabelAset.jsx';
import ModalTambahAset from './ModalTambahAset.jsx';

const Aset = ({ formatRupiah, showToast }) => {
  const [daftarAset, setDaftarAset] = useState([
    { id: 1, nama: 'Gedung Kantor Utama', kategori: 'Aset Tetap - Properti & Lahan', tanggalPerolehan: '2024-01-10', nilaiPerolehan: 750000000, kondisi: 'Baik' },
    { id: 2, nama: 'Laptop Operasional (5 Unit)', kategori: 'Aset Tetap - Inventaris Kantor', tanggalPerolehan: '2025-03-15', nilaiPerolehan: 45000000, kondisi: 'Baik' },
    { id: 3, nama: 'Kendaraan Operasional Box', kategori: 'Aset Tetap - Kendaraan Operasional', tanggalPerolehan: '2023-06-20', nilaiPerolehan: 180000000, kondisi: 'Perawatan' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveAset = (formData) => {
    const newAset = {
      id: daftarAset.length > 0 ? Math.max(...daftarAset.map(a => a.id)) + 1 : 1,
      ...formData,
      nilaiPerolehan: parseInt(formData.nilaiPerolehan)
    };

    setDaftarAset([...daftarAset, newAset]);
    
    if (showToast) {
      showToast('Aset baru berhasil ditambahkan!');
    }
  };

  const totalNilaiAset = daftarAset.reduce((acc, curr) => acc + curr.nilaiPerolehan, 0);

  return (
    <div className="animate-ios-slide max-w-6xl mx-auto relative transition-colors duration-300">
      
      <HeaderAset 
        totalNilaiAset={totalNilaiAset} 
        jumlahAset={daftarAset.length} 
        onOpenModal={() => setIsModalOpen(true)} 
        formatRupiah={formatRupiah} 
      />

      <TabelAset 
        daftarAset={daftarAset} 
        formatRupiah={formatRupiah} 
      />

      <ModalTambahAset 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSaveAset} 
      />

    </div>
  );
};

export default Aset;