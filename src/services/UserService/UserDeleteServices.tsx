import config from "../../config/config.json";  

const baseUrl = config.baseUrl;



/* METODO DELETE */
export const deleteUsers = async (userId: string, isActive: number) => {
    const response = await fetch(`${baseUrl}/user/${userId}/${isActive}`, {
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