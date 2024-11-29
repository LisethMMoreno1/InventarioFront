import config from "../../config/config.json";

const baseUrl = config.baseUrl;

/* METODO DELETE */
export const deleteTypeOfIdentifications = async (id: number) => {
  const response = await fetch(`${baseUrl}/typeOfIdentifications/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${errorText}`);
  }
};
