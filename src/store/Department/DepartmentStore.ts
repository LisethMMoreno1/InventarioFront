import { create } from "zustand";
import { DepartmentsTypes } from "../../types/Department/DepartmentType";
import { postDepartments } from "../../services/DepartmentService/departmentPostServices";

// Define la interfaz para el estado del store
interface DepartmentFormStore {
  department: DepartmentsTypes;
  loading: boolean;
  error: string | null;

  // Acciones
  setDepartment: (department: Partial<DepartmentsTypes>) => void;
  submitDepartment: (
    onSuccess: () => void,
    onError: (message: string) => void
  ) => Promise<void>;
}

// Crear el store de Zustand
export const useDepartmentFormStore = create<DepartmentFormStore>((set) => ({
  department: {
    id: 0,
    Department: "",
    codeDepartment: "",
  },
  loading: false,
  error: null,

  // Acción para actualizar el estado del departamento en el store
  setDepartment: (department) => {
    set((state) => ({
      department: { ...state.department, ...department },
      error: null, // limpiar error en caso de que exista
    }));
  },

  // Acción para enviar el formulario
  submitDepartment: async (onSuccess, onError) => {
    set({ loading: true, error: null });
    try {
      const response = await postDepartments(
        useDepartmentFormStore.getState().department
      );

      set({
        loading: false,
        department: { id: 0, Department: "", codeDepartment: "" },
      });
      onSuccess();
    } catch (error: any) {
      set({ loading: false, error: error.message });
      onError(error.message);
    }
  },
}));
