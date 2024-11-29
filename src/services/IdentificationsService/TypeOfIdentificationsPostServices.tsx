import { typeOfIdentification } from "../../types/TypeOfIdentification/typeOfIdentificationType";
import config from "../../config/config.json";

const baseUrl = config.baseUrl;


/* METODO POST */
export const postTypeOfIdentifications = async (typeOfIdentificationsRequest: typeOfIdentification) => {
    const response = await fetch(`${baseUrl}/typeOfIdentifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeOfIdentificationsRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};

