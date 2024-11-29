import { genreType } from '../../types/TypeOfGenders/typeOfGendersType';
import config from "../../config/config.json";

const baseUrl = config.baseUrl;



/* METODO POST */
export const postTypeOfGenders = async (typeOfGendersRequest: genreType) => {
    const response = await fetch(`${baseUrl}/typeOfGenders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeOfGendersRequest),
    });
  
    if (!response.ok) {
      throw new Error('La respuesta de la red no era correcta');
    }
  
    return await response.json();
  };
  