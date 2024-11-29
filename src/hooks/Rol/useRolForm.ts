import { useEffect, useState } from "react";
import { getRoles } from "../../services/RolesService/RolesGetServices";
import { RolesType } from "../../types/Rol/rolType";

const useRoles = () => {
  const [roles, setRoles] = useState<RolesType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error: any) {
        setError(error.message || "Error al cargar los roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
