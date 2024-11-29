
import create from 'zustand';
import { UserGet } from '../../types/User/UserType';

interface UserStore {
  users: UserGet[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setUsers: (users: UserGet[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: true,
  error: null,
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
