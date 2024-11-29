import config from "../../config/config.json";
import CityType from "../../types/City/CityType";

const baseUrl = config.baseUrl;

/* METODO POST */
export const postCity = async (CityRequest: CityType) => {
  const response = await fetch(`${baseUrl}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CityRequest),
  });

  if (!response.ok) {
    throw new Error("La respuesta de la red no era correcta");
  }

  return await response.json();
};