import config from "../../config/config.json";
import { DepartmentsTypes } from "../../types/Department/DepartmentType";

const baseUrl = config.baseUrl;

/* METODO POST */
export const postDepartments = async (departmentsRequest: DepartmentsTypes) => {
  const response = await fetch(`${baseUrl}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentsRequest),
  });

  if (!response.ok) {
    throw new Error("La respuesta de la red no era correcta");
  }

  return await response.json();
};