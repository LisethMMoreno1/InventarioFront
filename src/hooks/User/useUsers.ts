
import { useState, useEffect } from 'react';
import { UserGet } from '../../types/User/UserType';
import { getUsers } from '../../services/UserService/UserGetServices';


export function useUsers() {
  const [users, setUsers] = useState<UserGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los usuarios');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.identificationNumber.toString().includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleUsersPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  

  return {
    users: currentUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    paginate,
    handleUsersPerPageChange,
    totalPages,
    currentPage,
  };
}
