import { useEffect, useState } from "react";
import { getDepartments } from "../../services/DepartmentService/departmentGetService";
import { DepartmentsTypes } from "../../types/Department/DepartmentType";

const useDepartment = () => {
  const [departments, setDepartments] = useState<DepartmentsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error: any) {
        setError(error.message || "Error al cargar los departamentos");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const deleteDepartments = async (departmentsId: number) => {
    try {
      const response = await deleteDepartments(departmentsId);
      console.log("Departamento eliminada con éxito:", response);
      setDepartments((prevDepartments) =>
        prevDepartments.filter(
          (departments) => departments.id !== departmentsId
        )
      );
    } catch (error) {
      console.error("Error al eliminar la Departamento:", error);
    }
  };

  return { departments, loading, error, deleteDepartments };
};

export default useDepartment;
