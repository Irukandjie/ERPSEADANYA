import React from 'react';
import HeaderNeraca from './HeaderNeraca.jsx';
import SectionAsetNeraca from './SectionAsetNeraca.jsx';
import SectionKewajibanNeraca from './SectionKewajibanNeraca.jsx';
import SectionEkuitasNeraca from './SectionEkuitasNeraca.jsx';

const Neraca = ({ transactions, daftarAset, daftarTagihan, dataLR, formatRupiah }) => {
  // 1. KAS (Dari Arus Kas)
  const totalPemasukan = transactions.filter(t => t.tipe.includes('Pemasukan')).reduce((acc, curr) => acc + curr.jumlah, 0);
  const totalPengeluaran = transactions.filter(t => t.tipe.includes('Pengeluaran')).reduce((acc, curr) => acc + curr.jumlah, 0);
  const kasDanBank = totalPemasukan - totalPengeluaran;

  // 2. PIUTANG (Dari Utang Piutang)
  const piutangUsaha = daftarTagihan.filter(t => t.kategori.includes('Piutang') && t.status === 'Belum Lunas').reduce((acc, curr) => acc + curr.jumlah, 0);

  // 3. ASET FISIK (Dari Aset)
  const asetTetap = daftarAset.filter(a => a.kategori.includes('Aset Tetap')).reduce((acc, curr) => acc + curr.nilaiPerolehan, 0);
  const asetTakBerwujud = daftarAset.filter(a => a.kategori.includes('Tak Berwujud')).reduce((acc, curr) => acc + curr.nilaiPerolehan, 0);
  const asetLancarLainnya = daftarAset.filter(a => a.kategori.includes('Aset Lancar')).reduce((acc, curr) => acc + curr.nilaiPerolehan, 0);

  // 4. UTANG (Dari Utang Piutang)
  const utangPendek = daftarTagihan.filter(t => t.kategori.includes('Utang') && t.status === 'Belum Lunas').reduce((acc, curr) => acc + curr.jumlah, 0);

  // 5. LABA BERSIH (Dari Laba Rugi)
  const sumArray = (arr) => arr.reduce((acc, curr) => acc + curr.nilai, 0);
  const totalRev = sumArray(dataLR.pendapatan.operasional) + sumArray(dataLR.pendapatan.nonOperasional);
  const totalHPP = sumArray(dataLR.hpp.bahanBaku) + sumArray(dataLR.hpp.tenagaKerja);
  const totalOpex = sumArray(dataLR.opex.pegawai) + sumArray(dataLR.opex.umum) + sumArray(dataLR.opex.penyusutan);
  const totalLuarUsaha = sumArray(dataLR.luarUsaha.beban) + sumArray(dataLR.luarUsaha.pajak);
  const labaBersih = totalRev - totalHPP - totalOpex - totalLuarUsaha;

  // 6. MODAL AWAL (Dari Transaksi)
  const modalDisetor = transactions.filter(t => t.kategori === 'Modal').reduce((acc, curr) => acc + curr.jumlah, 0);

  // --- MAPPING DATA KE FORMAT KOMPONEN ---
  const dataNeraca = {
    aset: {
      lancar: [
        { nama: 'Kas & Bank', nilai: kasDanBank },
        { nama: 'Piutang Usaha', nilai: piutangUsaha },
        ...(asetLancarLainnya > 0 ? [{ nama: 'Persediaan & Aset Lancar Lain', nilai: asetLancarLainnya }] : [])
      ],
      tetap: [
        { nama: 'Total Aset Tetap', nilai: asetTetap }
      ],
      takBerwujud: [
        ...(asetTakBerwujud > 0 ? [{ nama: 'Aset Tak Berwujud', nilai: asetTakBerwujud }] : [])
      ]
    },
    kewajiban: {
      pendek: [
        { nama: 'Kewajiban Jangka Pendek', nilai: utangPendek }
      ],
      panjang: []
    },
    ekuitas: {
      modal: [
        { nama: 'Modal Disetor', nilai: modalDisetor },
        { nama: 'Laba Tahun Berjalan', nilai: labaBersih }
      ],
      prive: []
    }
  };

  const totalAset = kasDanBank + piutangUsaha + asetLancarLainnya + asetTetap + asetTakBerwujud;
  const totalKewajiban = utangPendek;
  const totalEkuitas = modalDisetor + labaBersih;
  const totalPasiva = totalKewajiban + totalEkuitas;

  return (
    <div className="animate-ios-slide max-w-5xl mx-auto relative pb-10 transition-colors duration-300">
      <HeaderNeraca totalAset={totalAset} totalPasiva={totalPasiva} formatRupiah={formatRupiah} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="h-full">
          <SectionAsetNeraca data={dataNeraca.aset} totalAset={totalAset} formatRupiah={formatRupiah} />
        </div>
        <div className="flex flex-col h-full gap-6">
          <SectionKewajibanNeraca data={dataNeraca.kewajiban} totalKewajiban={totalKewajiban} formatRupiah={formatRupiah} />
          <div className="flex-1">
            <SectionEkuitasNeraca data={dataNeraca.ekuitas} totalEkuitas={totalEkuitas} formatRupiah={formatRupiah} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neraca;