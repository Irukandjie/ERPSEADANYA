import React, { useState } from 'react';
import LoginForm from './components/login/LoginForm.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import sidebar from './components/Dashboard/sidebar.jsx';

const App = () => {
  // State untuk ngecek user udah login atau belum
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kalau belum login, render LoginForm
  if (!isLoggedIn) {
    return <LoginForm onLogin={setIsLoggedIn} />;
  }

  // Kalau udah login, render Dashboard (kirim props onLogout biar bisa keluar)
  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
};

export default App;