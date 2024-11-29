import config from "../../config/config.json";
import { typeOfIdentification } from "../../types/TypeOfIdentification/typeOfIdentificationType";


const baseUrl = config.baseUrl;


export const updateTypeOfIdentifications = async (typeOfIdentification : typeOfIdentification) => {
    // Aquí pones la lógica para actualizar el rol, utilizando tu API
    const response = await fetch(`/${baseUrl}/typeOfIdentifications/${typeOfIdentification.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeOfIdentification),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el typeOfIdentification');
    }
  
    return response.json();
  };
  