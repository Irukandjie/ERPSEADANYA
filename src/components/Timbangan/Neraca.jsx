import React, { useMemo } from 'react';
import HeaderNeraca from './HeaderNeraca.jsx';
import SectionAsetNeraca from './SectionAsetNeraca.jsx';
import SectionKewajibanNeraca from './SectionKewajibanNeraca.jsx';
import SectionEkuitasNeraca from './SectionEkuitasNeraca.jsx';

// Bikin fungsi helper biar aman kalau data array-nya kosong (undefined)
const safeReduce = (arr, key = 'jumlah') => {
  if (!arr || !Array.isArray(arr)) return 0;
  return arr.reduce((acc, curr) => acc + (curr[key] || 0), 0);
};

const Neraca = ({ transactions = [], daftarAset = [], daftarTagihan = [], dataLR = null, formatRupiah }) => {

  const dataNeraca = useMemo(() => {
    // 1. KAS (Dari Arus Kas)
    const totalPemasukan = transactions.filter(t => t.tipe.includes('Pemasukan') || t.tipe.includes('Debit')).reduce((acc, curr) => acc + curr.jumlah, 0);
    const totalPengeluaran = transactions.filter(t => t.tipe.includes('Pengeluaran') || t.tipe.includes('Kredit')).reduce((acc, curr) => acc + curr.jumlah, 0);
    const kasDanBank = totalPemasukan - totalPengeluaran;

    // 2. PIUTANG (Dari Utang Piutang)
    const piutangUsaha = safeReduce(daftarTagihan.filter(t => t.kategori.includes('Piutang') && t.status === 'Belum Lunas'), 'jumlah');

    // 3. ASET FISIK (Dari Aset)
    const asetTetap = safeReduce(daftarAset.filter(a => a.kategori.includes('Aset Tetap')), 'nilaiPerolehan');
    const asetTakBerwujud = safeReduce(daftarAset.filter(a => a.kategori.includes('Tak Berwujud')), 'nilaiPerolehan');
    const asetLancarLainnya = safeReduce(daftarAset.filter(a => a.kategori.includes('Aset Lancar')), 'nilaiPerolehan');

    // 4. UTANG (Dari Utang Piutang)
    const utangPendek = safeReduce(daftarTagihan.filter(t => t.kategori.includes('Utang') && t.status === 'Belum Lunas'), 'jumlah');

    // 5. LABA BERSIH (Dari Laba Rugi)
    let labaBersih = 0;
    if (dataLR) {
      const totalRev = safeReduce(dataLR.pendapatan?.operasional, 'nilai') + safeReduce(dataLR.pendapatan?.nonOperasional, 'nilai');
      const totalHPP = safeReduce(dataLR.hpp?.bahanBaku, 'nilai') + safeReduce(dataLR.hpp?.tenagaKerja, 'nilai');
      const totalOpex = safeReduce(dataLR.opex?.pegawai, 'nilai') + safeReduce(dataLR.opex?.umum, 'nilai') + safeReduce(dataLR.opex?.penyusutan, 'nilai');
      const totalLuarUsaha = safeReduce(dataLR.luarUsaha?.beban, 'nilai') + safeReduce(dataLR.luarUsaha?.pajak, 'nilai');
      labaBersih = totalRev - totalHPP - totalOpex - totalLuarUsaha;
    }

    // 6. MODAL AWAL (Dari Transaksi)
    const modalDisetor = safeReduce(transactions.filter(t => t.kategori === 'Modal'), 'jumlah');

    return {
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
  }, [transactions, daftarAset, daftarTagihan, dataLR]);

  // Kalkulasi Total untuk Header
  const totalAset = safeReduce(dataNeraca.aset.lancar, 'nilai') + safeReduce(dataNeraca.aset.tetap, 'nilai') + safeReduce(dataNeraca.aset.takBerwujud, 'nilai');
  const totalKewajiban = safeReduce(dataNeraca.kewajiban.pendek, 'nilai') + safeReduce(dataNeraca.kewajiban.panjang, 'nilai');
  const totalEkuitas = safeReduce(dataNeraca.ekuitas.modal, 'nilai') - safeReduce(dataNeraca.ekuitas.prive, 'nilai'); // Prive dikurang
  const totalPasiva = totalKewajiban + totalEkuitas;

  return (
    <div className="animate-ios-slide max-w-5xl mx-auto relative pb-10 transition-colors duration-300">
      
      <HeaderNeraca totalAset={totalAset} totalPasiva={totalPasiva} formatRupiah={formatRupiah} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Kolom Kiri: ASET */}
        <div className="h-full">
          <SectionAsetNeraca data={dataNeraca.aset} totalAset={totalAset} formatRupiah={formatRupiah} />
        </div>

        {/* Kolom Kanan: KEWAJIBAN & EKUITAS */}
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