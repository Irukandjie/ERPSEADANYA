import React, { useState } from 'react';
import HeaderLabaRugi from './HeaderLabaRugi.jsx';
import SectionPendapatan from './SectionPendapatan.jsx';
import SectionHPP from './SectionHPP.jsx';
import SectionOpex from './SectionOpex.jsx';
import SectionLuarUsaha from './SectionLuarUsaha.jsx';
import PopupTambah from './PopupTambahh.jsx';
import PopupEdit from './PopupEdit.jsx';
import PopupHapus from './PopupHapus.jsx';

const LabaRugi = ({ formatRupiah }) => {
  // 1. UBAH useMemo JADI useState & TAMBAHKAN ID UNTUK MASING-MASING DATA
  const [dataLR, setDataLR] = useState({
    pendapatan: {
      operasional: [
        { id: 'p_op_1', nama: 'Tagihan Rawat Inap', nilai: 250000000 },
        { id: 'p_op_2', nama: 'Konsultasi Poli', nilai: 85000000 },
        { id: 'p_op_3', nama: 'Resep Farmasi', nilai: 120000000 },
        { id: 'p_op_4', nama: 'Cek Laboratorium', nilai: 45000000 }
      ],
      nonOperasional: [
        { id: 'p_no_1', nama: 'Sewa Tenant Kantin', nilai: 15000000 },
        { id: 'p_no_2', nama: 'Tarif Parkir RS', nilai: 8000000 }
      ]
    },
    hpp: {
      bahanBaku: [
        { id: 'h_bb_1', nama: 'Obat & Farmasi', nilai: 75000000 },
        { id: 'h_bb_2', nama: 'BHP Medis (Jarum, Infus, dll)', nilai: 35000000 }
      ],
      tenagaKerja: [
        { id: 'h_tk_1', nama: 'Honor Dokter Spesialis', nilai: 110000000 },
        { id: 'h_tk_2', nama: 'Insentif Perawat Tindakan', nilai: 30000000 }
      ]
    },
    opex: {
      pegawai: [
        { id: 'o_pg_1', nama: 'Gaji Staf Admin & Manajemen', nilai: 65000000 },
        { id: 'o_pg_2', nama: 'Gaji Satpam & CS', nilai: 25000000 }
      ],
      umum: [
        { id: 'o_um_1', nama: 'Listrik & Air', nilai: 18000000 },
        { id: 'o_um_2', nama: 'Internet & ATK', nilai: 5000000 },
        { id: 'o_um_3', nama: 'Maintenance Sistem ERP', nilai: 7000000 }
      ],
      penyusutan: [
        { id: 'o_py_1', nama: 'Penyusutan Alat Medis (USG, dll)', nilai: 12000000 },
        { id: 'o_py_2', nama: 'Penyusutan Gedung', nilai: 20000000 }
      ]
    },
    luarUsaha: {
      beban: [
        { id: 'l_bb_1', nama: 'Bunga Pinjaman Bank', nilai: 15000000 }
      ],
      pajak: [
        { id: 'l_pj_1', nama: 'Pajak Penghasilan Badan (PPh)', nilai: 25000000 } 
      ]
    }
  });

  // State Kontrol Popup
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHapusOpen, setIsHapusOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Menyimpan data yang mau diedit/dihapus

  // Helper Cari Induk Kategori (Pendapatan/HPP/OPEX/LuarUsaha)
  const getMainCategory = (subCat) => {
    if (['operasional', 'nonOperasional'].includes(subCat)) return 'pendapatan';
    if (['bahanBaku', 'tenagaKerja'].includes(subCat)) return 'hpp';
    if (['pegawai', 'umum', 'penyusutan'].includes(subCat)) return 'opex';
    if (['beban', 'pajak'].includes(subCat)) return 'luarUsaha';
    return '';
  };

  // Fungsi Tambah Data
  const handleAddData = (formData) => {
    const mainCat = getMainCategory(formData.kategori);
    const newItem = { id: `item_${Date.now()}`, nama: formData.nama, nilai: formData.nilai };
    
    setDataLR(prev => ({
      ...prev,
      [mainCat]: {
        ...prev[mainCat],
        [formData.kategori]: [...prev[mainCat][formData.kategori], newItem]
      }
    }));
  };

  // Fungsi Edit Data
  const handleEditData = (formData) => {
    const mainCat = getMainCategory(formData.kategori);
    
    setDataLR(prev => {
      const updatedArray = prev[mainCat][formData.kategori].map(item => 
        item.id === formData.id ? { ...item, nama: formData.nama, nilai: formData.nilai } : item
      );
      return {
        ...prev,
        [mainCat]: { ...prev[mainCat], [formData.kategori]: updatedArray }
      };
    });
  };

  // Fungsi Hapus Data
  const handleDeleteData = (id, subCat) => {
    const mainCat = getMainCategory(subCat);
    
    setDataLR(prev => {
      const filteredArray = prev[mainCat][subCat].filter(item => item.id !== id);
      return {
        ...prev,
        [mainCat]: { ...prev[mainCat], [subCat]: filteredArray }
      };
    });
  };

  // KALKULASI OTOMATIS
  const sumArray = (arr) => arr.reduce((acc, curr) => acc + curr.nilai, 0);

  const totalPendapatan = sumArray(dataLR.pendapatan.operasional) + sumArray(dataLR.pendapatan.nonOperasional);
  const totalHPP = sumArray(dataLR.hpp.bahanBaku) + sumArray(dataLR.hpp.tenagaKerja);
  const labaKotor = totalPendapatan - totalHPP;

  const totalOpex = sumArray(dataLR.opex.pegawai) + sumArray(dataLR.opex.umum) + sumArray(dataLR.opex.penyusutan);
  const labaOperasional = labaKotor - totalOpex;

  const totalLuarUsaha = sumArray(dataLR.luarUsaha.beban) + sumArray(dataLR.luarUsaha.pajak);
  const labaBersih = labaOperasional - totalLuarUsaha;

  // Trigger Popup Edit/Hapus dari dalam Section
  const triggerEdit = (item, kategori) => {
    setSelectedItem({ ...item, kategori });
    setIsEditOpen(true);
  };

  const triggerDelete = (item, kategori) => {
    setSelectedItem({ ...item, kategori });
    setIsHapusOpen(true);
  };

  return (
    <div className="animate-ios-slide max-w-4xl mx-auto relative pb-10 transition-colors duration-300">
      
      {/* POPUP MODALS */}
      <PopupTambah isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} onSubmit={handleAddData} />
      <PopupEdit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSubmit={handleEditData} initialData={selectedItem} />
      <PopupHapus isOpen={isHapusOpen} onClose={() => setIsHapusOpen(false)} onConfirm={handleDeleteData} dataHapus={selectedItem} />

      <HeaderLabaRugi labaBersih={labaBersih} formatRupiah={formatRupiah} />
      
      {/* Tombol Tambah Data */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setIsTambahOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 text-sm active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Tambah Data Laba Rugi
        </button>
      </div>
      
      <SectionPendapatan data={dataLR.pendapatan} totalPendapatan={totalPendapatan} formatRupiah={formatRupiah} onEdit={triggerEdit} onDelete={triggerDelete} />
      
      <SectionHPP data={dataLR.hpp} totalHPP={totalHPP} labaKotor={labaKotor} formatRupiah={formatRupiah} onEdit={triggerEdit} onDelete={triggerDelete} />
      
      <SectionOpex data={dataLR.opex} totalOpex={totalOpex} labaOperasional={labaOperasional} formatRupiah={formatRupiah} onEdit={triggerEdit} onDelete={triggerDelete} />
      
      <SectionLuarUsaha data={dataLR.luarUsaha} totalLuarUsaha={totalLuarUsaha} formatRupiah={formatRupiah} onEdit={triggerEdit} onDelete={triggerDelete} />
    </div>
  );
};

export default LabaRugi;