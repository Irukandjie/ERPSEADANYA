import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartAset = ({ formatRupiah }) => {
  const asetDataForChart = [
    { name: 'Properti & Lahan', value: 750000000 },
    { name: 'Kendaraan', value: 180000000 },
    { name: 'Inventaris IT', value: 45000000 },
  ];
  
  const COLORS_ASET = ['#3b82f6', '#f59e0b', '#10b981'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700/50 p-6 md:p-8 relative overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-extrabold text-slate-800 dark:text-white text-xl tracking-tight transition-colors">Distribusi Aset</h2>
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 transition-colors">Berdasarkan Kategori</p>
        </div>
        <div className="w-10 h-10 rounded-[0.85rem] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
      </div>
      
      <div className="h-[260px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={asetDataForChart} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
              {asetDataForChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_ASET[index % COLORS_ASET.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatRupiah(value)} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }} 
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartAset;