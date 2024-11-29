import config from "../../config/config.json";
import { typeOfIdentification } from "../../types/TypeOfIdentification/typeOfIdentificationType";

const baseUrl = config.baseUrl;

/* METODO DELETE */
export const deleteTypeOfIdentifications = async (id: typeOfIdentification) => {
  const response = await fetch(`${baseUrl}/typeOfIdentifications/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("La respuesta de la red no era correcta");
  }

  const data = await response.text();

  if (data) {
    return JSON.parse(data);
  } else {
    return {};
  }
};
