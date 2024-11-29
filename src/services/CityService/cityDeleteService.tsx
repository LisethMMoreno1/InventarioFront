import config from "../../config/config.json";

const baseUrl = config.baseUrl;



/* METODO DELETE */
export const deleteCityService = async (id: number) => {
  const response = await fetch(`${baseUrl}/cities/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Si hay un error, podrías intentar extraer un mensaje del cuerpo de la respuesta
    const errorText = await response.text();
    throw new Error(`La respuesta de la red no era correcta: ${errorText}`);
  }

  // Retorna un objeto vacío si no hay respuesta JSON
  return response.status === 204 ? {} : await response.json();
};
