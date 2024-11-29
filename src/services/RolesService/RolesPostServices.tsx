import config from "../../config/config.json";
import { RolesType } from "../../types/Rol/rolType";

const baseUrl = config.baseUrl;



  
/* METODO POST */
export const postRoles = async (rolesRequest: RolesType) => {
  const response = await fetch(`${baseUrl}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rolesRequest),
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};


