import { UserPost } from "../../types/User/UserCreateType";
import config from "../../config/config.json";

const baseUrl = config.baseUrl;

/* METODO POST */
export async function PostUsers(userRequest: UserPost) {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRequest),
    });

    console.log('Respuesta del servidor:', response);

    if (!response.ok) {
      let errorDetails = 'Error desconocido';

      try {
        const errorData = await response.json();
        errorDetails = errorData.message || 'Error al registrar el usuario';
      } catch (jsonError) {
        console.error('Error al parsear la respuesta como JSON:', jsonError);
        errorDetails = await response.text() || 'Error al registrar el usuario';
      }

      throw new Error(errorDetails);
    }

    return response.json();
  } catch (error) {
    console.error('Error en PostUsers:', error);
    throw error;
  }
}
