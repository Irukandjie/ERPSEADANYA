import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartUtang = ({ formatRupiah }) => {
  const utangPiutangDataForChart = [
    { name: 'Klaim BPJS', Piutang: 450000000, Utang: 0 },
    { name: 'Asuransi Swasta', Piutang: 24000000, Utang: 0 },
    { name: 'Suplier (PBF)', Piutang: 0, Utang: 85000000 },
    { name: 'Jasa Medis', Piutang: 0, Utang: 15000000 },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 md:p-8 relative overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-extrabold text-slate-800 dark:text-white text-xl tracking-tight transition-colors">Utang & Piutang</h2>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 transition-colors">Tagihan Aktif Terkini</p>
        </div>
        <div className="w-10 h-10 rounded-[0.85rem] bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
        </div>
      </div>
      
      <div className="h-[260px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={utangPiutangDataForChart} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.2} stroke="#94a3b8" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} width={90} />
            <Tooltip 
              formatter={(value) => formatRupiah(value)} 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }} 
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}/>
            <Bar dataKey="Piutang" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={20} />
            <Bar dataKey="Utang" fill="#f43f5e" radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartUtang;