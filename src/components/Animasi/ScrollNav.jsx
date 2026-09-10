import React, { useState, useEffect } from 'react';

const ScrollNav = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);
  const [scrollElement, setScrollElement] = useState(null);

  useEffect(() => {
    // Target spesifik area scrollable di Dashboard lu
    const container = document.querySelector('.flex-1.overflow-y-auto');
    
    if (container) {
      setScrollElement(container);
      
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        
        // Munculin tombol UP kalau udah scroll ke bawah lebih dari 200px
        setShowUp(scrollTop > 200);
        
        // Ilangin tombol DOWN kalau udah mentok bawah
        setShowDown(scrollTop + clientHeight < scrollHeight - 20);
      };

      container.addEventListener('scroll', handleScroll);
      // Panggil sekali pas awal buat ngecek status
      handleScroll();
      
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollUp = () => {
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollElement) {
      scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    // Posisi fixed di pojok kanan bawah (di atas sidebar mobile)
    <div className="fixed bottom-24 md:bottom-10 right-5 md:right-10 z-[90] flex flex-col gap-3">
      
      {/* Tombol Scroll Ke Atas */}
      <button 
        onClick={scrollUp}
        className={`w-12 h-12 flex items-center justify-center rounded-[1.25rem] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] border border-slate-200/50 dark:border-slate-700/50 text-blue-600 dark:text-blue-400 transition-all duration-500 hover:scale-110 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white group ${showUp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        title="Scroll ke Atas"
      >
        <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Tombol Scroll Ke Bawah */}
      <button 
        onClick={scrollDown}
        className={`w-12 h-12 flex items-center justify-center rounded-[1.25rem] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] border border-slate-200/50 dark:border-slate-700/50 text-blue-600 dark:text-blue-400 transition-all duration-500 hover:scale-110 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white group ${showDown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
        title="Scroll ke Bawah"
      >
        <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

    </div>
  );
};

export default ScrollNav;