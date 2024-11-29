import config from "../../config/config.json";
import { RolesType } from "../../types/Rol/rolType";


const baseUrl = config.baseUrl;


export const updateRole = async (role : RolesType) => {
    // Aquí pones la lógica para actualizar el rol, utilizando tu API
    const response = await fetch(`/${baseUrl}/roles/${role.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el rol');
    }
  
    return response.json();
  };
  