import { useEffect } from 'react';
import { useUserFormStore } from '../../store/User/UserFormStore';

export const useUserFormData = () => {
  const { fetchRoles, fetchTypeOfGenders, fetchTypeOfIdentifications } = useUserFormStore();

  useEffect(() => {
    fetchRoles();
    fetchTypeOfGenders();
    fetchTypeOfIdentifications();
  }, [fetchRoles, fetchTypeOfGenders, fetchTypeOfIdentifications]);
};
