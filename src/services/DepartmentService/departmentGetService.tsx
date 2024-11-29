import config from "../../config/config.json";
import { DepartmentsTypes } from "../../types/Department/DepartmentType";

const baseUrl = config.baseUrl;

/* METODO GET */
export const getDepartments = async (): Promise<DepartmentsTypes[]> => {
    const response = await fetch(`${baseUrl}/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("La respuesta de la red no era correcta");
  }

  return await response.json();
};
