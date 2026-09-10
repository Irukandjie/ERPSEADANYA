import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartGrafik = ({ transactions }) => {
  const chartData = useMemo(() => {
    const dataMap = {};

    transactions.forEach((t) => {
      const isPemasukan = t.tipe.includes('Pemasukan') || t.tipe.includes('Debit');
      const date = t.tanggal;
      
      if (!dataMap[date]) {
        dataMap[date] = { tanggal: date, Pemasukan: 0, Pengeluaran: 0 };
      }

      if (isPemasukan) {
        dataMap[date].Pemasukan += t.jumlah;
      } else {
        dataMap[date].Pengeluaran += t.jumlah;
      }
    });

    return Object.values(dataMap).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
  }, [transactions]);

  const formatYAxis = (value) => {
    if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)} M`;
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)} Jt`;
    if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)} Rb`;
    return `Rp ${value}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] min-w-[200px] transition-colors">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 mb-3 border-b border-slate-100 dark:border-slate-700/50 pb-2 uppercase tracking-widest">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1.5 last:mb-0">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.dataKey === 'Pemasukan' ? '#10b981' : '#f43f5e' }}></span>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 capitalize">{entry.name}</p>
              </div>
              <p className="text-sm font-black" style={{ color: entry.dataKey === 'Pemasukan' ? '#10b981' : '#f43f5e' }}>
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(entry.value)}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 md:p-8 mb-8 relative overflow-hidden transition-colors duration-300">
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 rounded-[1rem] text-white flex items-center justify-center shadow-lg shadow-indigo-200/50 dark:shadow-none transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="font-extrabold text-slate-800 dark:text-white text-2xl tracking-tight transition-colors">Grafik Arus Kas</h2>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 transition-colors">Statistik Pemasukan vs Pengeluaran</p>
        </div>
      </div>

      <div className="w-full h-[340px] relative z-10">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }} barGap={6}>
              <defs>
                <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              
              {/* Opacity dan stroke diatur agar pas di white maupun dark mode */}
              <CartesianGrid strokeDasharray="4 4" vertical={false} strokeOpacity={0.3} stroke="#94a3b8" />
              
              <XAxis 
                dataKey="tanggal" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} 
                dy={15}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                tickFormatter={formatYAxis}
                width={85} 
                dx={-5}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#cbd5e1', opacity: 0.15 }} />
              
              <Legend 
                iconType="circle" 
                wrapperStyle={{ paddingTop: '25px', fontSize: '13px', fontWeight: '800', color: '#64748b' }} 
              />
              
              <Bar dataKey="Pemasukan" fill="url(#colorPemasukan)" radius={[8, 8, 0, 0]} maxBarSize={45} />
              <Bar dataKey="Pengeluaran" fill="url(#colorPengeluaran)" radius={[8, 8, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-colors">
            <svg className="w-16 h-16 mb-4 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <p className="text-base font-bold text-slate-500 dark:text-slate-400">Belum ada data transaksi</p>
            <p className="text-xs font-medium mt-1 text-slate-400 dark:text-slate-500">Data grafik akan muncul setelah kamu mencatat transaksi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartGrafik;