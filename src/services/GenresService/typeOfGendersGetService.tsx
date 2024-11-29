import { genreType } from '../../types/TypeOfGenders/typeOfGendersType';
import config from "../../config/config.json";

const baseUrl = config.baseUrl;



/* METODO GET */
export const getTypeOfGenders = async (): Promise<genreType[]> => {
    const response = await fetch(`${baseUrl}/typeOfGenders`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
     
  
    });
    if (!response.ok) {
      throw new Error('La respuesta de la red no era correcta');
    }
    return await response.json();
  };
