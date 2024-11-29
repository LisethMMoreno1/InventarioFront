import { genreType } from '../../types/TypeOfGenders/typeOfGendersType';
import config from "../../config/config.json";

const baseUrl = config.baseUrl;


/* METODO DELETE */
export const deleteTypeOfGenders = async (GenreInter: genreType) => {
  const response = await fetch(`${baseUrl}/typeOfGenders/${GenreInter.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};




