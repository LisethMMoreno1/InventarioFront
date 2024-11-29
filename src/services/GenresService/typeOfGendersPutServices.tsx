import { genreType } from '../../types/TypeOfGenders/typeOfGendersType';
import config from "../../config/config.json";

const baseUrl = config.baseUrl;



/* METODO PUT */

export const updateTypeOfGenders = async (genreInter: genreType) => {
  const response = await fetch(`${baseUrl}/typeOfGenders/${genreInter.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      genre: genreInter.genre,
    }),
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};


export const getTypeOfGenderById = async (id: number) => {
  const response = await fetch(`${baseUrl}/typeOfGenders/${id}`);
  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }
  return await response.json();
};