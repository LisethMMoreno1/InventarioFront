import { useState, useEffect } from 'react';
import { UserGet } from '../../types/User/UserType';

const useUserModal = (initialUser: UserGet | null) => {
  const [selectedUser, setSelectedUser] = useState<UserGet | null>(initialUser);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedUser(initialUser);
    setIsOpen(!!initialUser);
  }, [initialUser]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  return {
    isOpen,
    selectedUser,
    openModal,
    closeModal,
  };
};

export default useUserModal;
