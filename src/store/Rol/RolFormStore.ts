import create from "zustand";
import { RolesType } from "../../types/Rol/rolType";

interface RolFormStore {
  rol: RolesType;
  setRol: (newRol: RolesType) => void;
  resetRol: () => void;
}

export const useRolFormStore = create<RolFormStore>((set) => ({
  rol: {
    typeOfRole: "",
    description: "",
  },
  setRol: (newRol) => set({ rol: newRol }),
  resetRol: () => set({ rol: { typeOfRole: "", description: "" } }),
}));
