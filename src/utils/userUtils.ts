import { UserPost } from "../types/User/UserCreateType";
import { UserGet } from "../types/User/UserType";

// Función para adaptar UserGet a UserPost
export function adaptUserGetToUserPost(userGet: UserGet, typeOfIdentificationId: number, genreId: number, roleId: number): UserPost {
  return {
    id: userGet.id ?? 0, // Proporciona un valor predeterminado si id es undefined
    typeOfIdentificationId: typeOfIdentificationId, // Proporcionar el ID de tipo de identificación
    identificationNumber: userGet.identificationNumber,
    firstName: userGet.firstName,
    middleName: userGet.middleName ?? '', // Asignar un valor predeterminado si es undefined
    firstLastName: userGet.firstLastName,
    secondLastName: userGet.secondLastName ?? '', // Asignar un valor predeterminado si es undefined
    phoneNumber: userGet.phoneNumber,
    email: userGet.email,
    genre: genreId, // Proporcionar el ID del género
    role: roleId, // Proporcionar el ID del rol
    password: userGet.password, // Este campo puede no ser siempre relevante, asegúrate de manejarlo correctamente
    isActive: userGet.isActive ?? true // Asignar un valor predeterminado si es undefined
  };
}
