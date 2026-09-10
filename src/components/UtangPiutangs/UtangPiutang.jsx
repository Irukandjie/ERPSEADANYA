import React, { useState } from 'react';
import HeaderUtang from './HeaderUtang.jsx';
import TabelUtang from './TabelUtang.jsx';
import ModalTambahUtang from './ModalTambahUtang.jsx'; // INI UDAH DIIMPORT SEKARANG

const UtangPiutang = ({ formatRupiah, showToast }) => {
  const [daftarTagihan, setDaftarTagihan] = useState([
    { id: 1, namaPihak: 'Klaim BPJS - Rawat Jalan Sept', kategori: 'Piutang - BPJS Kesehatan', jatuhTempo: '2026-10-15', jumlah: 450000000, status: 'Belum Lunas' },
    { id: 2, namaPihak: 'PT Enseval Medika Prima', kategori: 'Utang - Suplier Farmasi (PBF)', jatuhTempo: '2026-09-28', jumlah: 85000000, status: 'Belum Lunas' },
    { id: 3, namaPihak: 'Jasa Visite dr. SP.PD', kategori: 'Utang - Jasa Medis (Fee Dokter)', jatuhTempo: '2026-09-15', jumlah: 15000000, status: 'Lunas' },
    { id: 4, namaPihak: 'Tagihan Admedika', kategori: 'Piutang - Asuransi Swasta', jatuhTempo: '2026-11-01', jumlah: 24000000, status: 'Belum Lunas' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTagihan = (formData) => {
    const newTagihan = {
      id: daftarTagihan.length > 0 ? Math.max(...daftarTagihan.map(a => a.id)) + 1 : 1,
      ...formData,
      jumlah: parseInt(formData.jumlah)
    };

    setDaftarTagihan([...daftarTagihan, newTagihan]);
    
    if (showToast) {
      showToast('Data Tagihan berhasil ditambahkan!');
    }
  };

  // Menghitung Total Utang & Piutang (Hanya yang Belum Lunas)
  const totalPiutang = daftarTagihan
    .filter(item => item.kategori.includes('Piutang') && item.status === 'Belum Lunas')
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalUtang = daftarTagihan
    .filter(item => item.kategori.includes('Utang') && item.status === 'Belum Lunas')
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  return (
    <div className="animate-ios-slide max-w-6xl mx-auto relative space-y-7">
      <HeaderUtang 
        totalPiutang={totalPiutang} 
        totalUtang={totalUtang} 
        onOpenModal={() => setIsModalOpen(true)} 
        formatRupiah={formatRupiah} 
      />

      <TabelUtang 
        daftarTagihan={daftarTagihan} 
        formatRupiah={formatRupiah} 
      />

      <ModalTambahUtang 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSaveTagihan} 
      />
    </div>
  );
};

export default UtangPiutang;