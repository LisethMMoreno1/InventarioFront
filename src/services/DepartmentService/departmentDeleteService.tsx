import config from "../../config/config.json";
import { DepartmentsTypes } from '../../types/Department/DepartmentType';

const baseUrl = config.baseUrl;


/* METODO DELETE */
export const deleteDepartments  = async (id: DepartmentsTypes) => {
  const response = await fetch(`${baseUrl}/departments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};




