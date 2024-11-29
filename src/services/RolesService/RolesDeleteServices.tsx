import config from "../../config/config.json";

const baseUrl = config.baseUrl;

/* METODO DELETE */
export const deleteRoles = async (id: number) => {
  const response = await fetch(`${baseUrl}/roles/${id}`, {
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
