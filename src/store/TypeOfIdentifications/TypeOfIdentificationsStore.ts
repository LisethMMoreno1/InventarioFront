import create from "zustand";
import { typeOfIdentification } from "../../types/TypeOfIdentification/typeOfIdentificationType";

interface TypeOfIdentificationsStore {
  typeOfIdentifications: typeOfIdentification;
  setTypeOfIdentification: (
    newTypeOfIdentification: typeOfIdentification
  ) => void;
  resetTypeOfIdentification: () => void;
}

export const useTypeOfIdentificationsStore = create<TypeOfIdentificationsStore>(
  (set) => ({
    typeOfIdentifications: {
      name: "",
      identifier: "",
    },
    setTypeOfIdentification: (newTypeOfIdentification) =>
      set({ typeOfIdentifications: newTypeOfIdentification }),
    resetTypeOfIdentification: () =>
      set({ typeOfIdentifications: { name: "", identifier: "" } }),
  })
);
