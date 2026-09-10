import React, { useState } from 'react';
import HeaderUsers from './HeaderUsers.jsx';
import TabelUsers from './TabelUsers.jsx';
import ModalTambahUser from './ModalTambahUser.jsx';

const Users = ({ showToast }) => {
  // State utama buat data User
  const [users, setUsers] = useState([
    { id: 1, nama: 'Admin Pusat', role: 'Super Admin', status: 'Aktif', email: 'admin@erp.com', lastLogin: 'Hari ini, 08:30' },
    { id: 2, nama: 'Budi Santoso', role: 'Staff Keuangan', status: 'Aktif', email: 'budi.s@erp.com', lastLogin: 'Kemarin, 14:15' },
    { id: 3, nama: 'Siti Aminah', role: 'Manager', status: 'Nonaktif', email: 'siti.a@erp.com', lastLogin: '12 Sep 2026' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi buat nangkep kiriman form dari Modal
  const handleSaveUser = (formData) => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...formData,
      lastLogin: 'Belum pernah login' // Anggap user baru diundang
    };

    setUsers([...users, newUser]);
    
    // Tembak animasinya ke Dashboard!
    if (showToast) {
      showToast('User baru berhasil ditambahkan!');
    }
  };

  const activeUsersCount = users.filter(u => u.status === 'Aktif').length;

  return (
    <div className="animate-ios-slide max-w-6xl mx-auto relative">
      
      <HeaderUsers 
        totalUsers={users.length} 
        activeUsers={activeUsersCount} 
        onOpenModal={() => setIsModalOpen(true)} 
      />

      <TabelUsers users={users} />

      <ModalTambahUser 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSaveUser} 
      />

    </div>
  );
};

export default Users;