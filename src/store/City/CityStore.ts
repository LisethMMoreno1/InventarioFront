import { create } from "zustand";

interface CityState {
  cities: {
    id: number;
    cities: string;
    codeCities: string;
    departmentId: string;
  }[];
  addCity: (newCity: {
    id: number;
    cities: string;
    codeCities: string;
    departmentId: string;
  }) => void;
}

export const useCityStore = create<CityState>((set) => ({
  cities: [],
  addCity: (newCity) =>
    set((state) => ({
      cities: [...state.cities, newCity],
    })),
}));
