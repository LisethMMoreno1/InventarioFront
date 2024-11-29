import { UserGet } from "../../types/User/UserType";
import config from "../../config/config.json";  

const baseUrl = config.baseUrl;

/* METODO GET */
export const getUsers = async (): Promise<UserGet[]> => {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
  
    });
    if (!response.ok) {
      throw new Error('La respuesta de la red no era correcta');
    }
    return await response.json();
  };
  