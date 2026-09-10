import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // Bikin state yang ngecek ke memori browser (localStorage) dulu
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const item = window.localStorage.getItem('tema-erp');
      return item === 'dark' ? true : false;
    } catch (error) {
      return false;
    }
  });

  // Efek ini bakal jalan otomatis tiap kali isDarkMode berubah
  useEffect(() => {
    const root = window.document.documentElement; // Ngambil tag <html> paling luar
    
    if (isDarkMode) {
      root.classList.add('dark'); // Nambahin class 'dark' ke seluruh web
      window.localStorage.setItem('tema-erp', 'dark'); // Simpen di memori
    } else {
      root.classList.remove('dark'); // Nyopot class 'dark'
      window.localStorage.setItem('tema-erp', 'light');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};