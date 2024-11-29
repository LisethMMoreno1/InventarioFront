import config from "../../config/config.json";
import CityType from "../../types/City/CityType";

const baseUrl = config.baseUrl;

/* METODO GET */
export const getCity = async (): Promise<CityType[]> => {
  const response = await fetch(`${baseUrl}/cities`, {
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
