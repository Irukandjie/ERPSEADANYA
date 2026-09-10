import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import SlidingPill from '../Animasi/SlidingPill'; 

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [showMobileMore, setShowMobileMore] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { id: 'arus-kas', label: 'Arus Kas', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )},
    { id: 'aset', label: 'Aset', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    )},
    { id: 'users', label: 'Users', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )},
    { id: 'utang-piutang', label: 'Utang', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
    )},
    { id: 'laba-rugi', label: 'Laba Rugi', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    )},
    { id: 'neraca', label: 'Neraca', icon: (
      <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
    )},
  ];

  const activeItemIndex = menuItems.findIndex(item => item.id === activeMenu);
  const isMoreActive = activeItemIndex >= 4 || activeMenu === 'profile';
  const mobilePillIndex = isMoreActive ? 4 : activeItemIndex;

  return (
    <>
      {showMobileMore && createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:hidden">
          <style>{`
            @keyframes slideUpGlass { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
            .animate-glass-up { animation: slideUpGlass 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
            @keyframes backdropFade { 0% { opacity: 0; backdrop-filter: blur(0px); } 100% { opacity: 1; backdrop-filter: blur(4px); } }
            .animate-backdrop-fade { animation: backdropFade 0.3s ease-out forwards; }
          `}</style>
          
          <div className="absolute inset-0 bg-slate-900/40 animate-backdrop-fade" onClick={() => setShowMobileMore(false)}></div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl w-full rounded-t-[2.5rem] p-7 pb-10 relative z-10 animate-glass-up shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border-t border-white/50 dark:border-slate-700/50 transition-colors">
            <div className="w-12 h-1.5 bg-slate-300/60 dark:bg-slate-700 rounded-full mx-auto mb-6 shadow-inner"></div>
            <h3 className="font-black text-slate-800 dark:text-white text-xl mb-5 px-2 tracking-tight">Menu Lainnya</h3>
            
            <div className="grid grid-cols-4 gap-4">
              {menuItems.slice(4).map(item => {
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveMenu(item.id); setShowMobileMore(false); }}
                    className={`group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-[1.25rem] transition-all duration-300 overflow-hidden active:scale-90 border shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_4px_15px_rgba(0,0,0,0.03)] dark:shadow-none ${
                      isActive 
                        ? 'bg-blue-100/50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/30' 
                        : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-white/60 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent skew-x-12 group-active:translate-x-full transition-transform duration-700 ease-in-out`}></div>
                    <span className="relative z-10 transition-transform duration-300 group-active:scale-110">{item.icon}</span>
                    <span className="relative z-10 text-[10px] font-extrabold text-center leading-tight transition-colors duration-300">{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => { setActiveMenu('profile'); setShowMobileMore(false); }}
                className={`group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-[1.25rem] transition-all duration-300 overflow-hidden active:scale-90 border shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_4px_15px_rgba(0,0,0,0.03)] dark:shadow-none ${
                  activeMenu === 'profile'
                    ? 'bg-blue-100/50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/30' 
                    : 'bg-white/40 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border-white/60 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 dark:via-white/10 to-transparent skew-x-12 group-active:translate-x-full transition-transform duration-700 ease-in-out`}></div>
                <span className="relative z-10 transition-transform duration-300 group-active:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <span className="relative z-10 text-[10px] font-extrabold text-center leading-tight transition-colors duration-300">Profile</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* INI KUNCI UTAMA SIDEBAR BIAR BISA GELAP JUGA */}
      <aside className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] md:static md:transform-none md:w-[260px] md:max-w-none md:flex-shrink-0 md:flex md:flex-col md:h-screen md:bg-white md:dark:bg-slate-900 md:border-0 md:border-r md:border-slate-100 md:dark:border-slate-800 md:rounded-none md:shadow-none transition-colors duration-300">
        
        <div className="hidden md:flex h-20 items-center px-7 border-b border-slate-100 dark:border-slate-800 transition-colors">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
            ERP <span className="text-blue-600 dark:text-blue-500">Acc</span>
          </h1>
        </div>

        <div className="flex-1 w-full md:overflow-y-auto md:py-6 rounded-full md:rounded-none relative">
          <div className="hidden md:block px-7 mb-4">
            <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Modul Utama</p>
          </div>
          
          <ul className="md:hidden relative flex flex-row items-center justify-between px-2 py-1.5 h-[64px] w-full">
            {mobilePillIndex >= 0 && (
              <div 
                className="absolute top-1.5 bottom-1.5 bg-blue-50 dark:bg-blue-500/20 rounded-[1.25rem] shadow-sm border border-blue-100 dark:border-blue-500/30 z-0 transition-all duration-300 ease-in-out"
                style={{ width: 'calc((100% - 16px) / 5)', left: '8px', transform: `translateX(calc(${mobilePillIndex} * 100%))` }}
              />
            )}
            
            {menuItems.slice(0, 4).map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <li key={item.id} className="flex-1 w-full h-full z-10 flex justify-center items-center">
                  <button onClick={() => setActiveMenu(item.id)} className={`group relative flex flex-col items-center justify-center gap-1 w-full h-full rounded-[1.25rem] transition-all duration-300 overflow-hidden active:scale-95 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${isActive ? 'via-white/50 dark:via-white/10' : 'via-slate-200/50 dark:via-slate-700/50'} to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out`}></div>
                    <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
                    <span className="relative z-10 text-[9px] font-bold transition-colors duration-300 line-clamp-1">{item.label}</span>
                  </button>
                </li>
              );
            })}

            <li className="flex-1 w-full h-full z-10 flex justify-center items-center">
              <button onClick={() => setShowMobileMore(true)} className={`group relative flex flex-col items-center justify-center gap-1 w-full h-full rounded-[1.25rem] transition-all duration-300 overflow-hidden active:scale-95 ${isMoreActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${isMoreActive ? 'via-white/50 dark:via-white/10' : 'via-slate-200/50 dark:via-slate-700/50'} to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out`}></div>
                <span className={`relative z-10 transition-transform duration-300 ${isMoreActive ? 'scale-110' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </span>
                <span className="relative z-10 text-[9px] font-bold transition-colors duration-300 line-clamp-1">Lainnya</span>
              </button>
            </li>
          </ul>

          <ul className="hidden md:flex relative flex-col items-stretch px-4 py-2 gap-1.5 h-auto w-full">
            {activeItemIndex >= 0 && (
              <div 
                className="absolute left-4 right-4 h-[48px] bg-blue-50 dark:bg-blue-500/20 rounded-xl transition-all duration-300 ease-in-out z-0"
                style={{ top: `calc(8px + ${activeItemIndex} * 54px)` }}
              />
            )}

            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <li key={item.id} className="flex-none w-full h-[48px] z-10">
                  <button onClick={() => setActiveMenu(item.id)} className={`group relative flex flex-row items-center justify-start gap-3 w-full h-full px-4 rounded-xl transition-all duration-300 overflow-hidden active:scale-[0.98] ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white'}`}>
                    <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${isActive ? 'via-white/20 dark:via-white/10' : 'via-slate-200/50 dark:via-slate-700/50'} to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out`}></div>
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-100">{item.icon}</span>
                    <span className="relative z-10 text-sm font-bold transition-colors duration-300">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:block p-5 border-t border-slate-100 dark:border-slate-800 transition-colors">
          <div onClick={() => setActiveMenu('profile')} className={`rounded-xl p-3 flex items-center gap-3 border transition-all duration-300 cursor-pointer group ${activeMenu === 'profile' ? 'bg-blue-50/80 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-700'}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner transition-all ${activeMenu === 'profile' ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-500/40' : 'bg-gradient-to-br from-blue-400 to-blue-600 group-hover:shadow-blue-500/30'}`}>
              AC
            </div>
            <div>
              <p className={`text-sm font-bold leading-none mb-1 ${activeMenu === 'profile' ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>Alden</p>
              <p className={`text-[10px] font-medium ${activeMenu === 'profile' ? 'text-blue-500 dark:text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>Front-End Dev</p>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;