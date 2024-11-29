import create from 'zustand';
import { RolesType } from '../../types/Rol/rolType';
import { typeOfIdentification } from '../../types/TypeOfIdentification/typeOfIdentificationType';
import { genreType } from '../../types/TypeOfGenders/typeOfGendersType';
import { getRoles } from '../../services/RolesService/RolesGetServices';
import { getTypeOfGenders } from '../../services/GenresService/typeOfGendersGetService';
import { getTypeOfIdentifications } from '../../services/IdentificationsService/TypeOfIdentificationsGetServices';

interface UserFormStore {
    roles: RolesType[];
    typeOfIdentifications: typeOfIdentification[];
    typeOfGenders: genreType[];
    fetchRoles: () => Promise<void>;
    fetchTypeOfGenders: () => Promise<void>;
    fetchTypeOfIdentifications: () => Promise<void>;
}

export const useUserFormStore = create<UserFormStore>((set) => ({
    roles: [],
    typeOfIdentifications: [],
    typeOfGenders: [],
    fetchRoles: async () => {
        try {
            const rolesData = await getRoles();
            set({ roles: rolesData });
        } catch (error) {
            console.error('Error al obtener roles:', error);
        }
    },
    fetchTypeOfGenders: async () => {
        try {
            const genreData = await getTypeOfGenders();
            set({ typeOfGenders: genreData });
        } catch (error) {
            console.error('Error al obtener géneros:', error);
        }
    },
    fetchTypeOfIdentifications: async () => {
        try {
            const typeOfIdentificationsData = await getTypeOfIdentifications();
            set({ typeOfIdentifications: typeOfIdentificationsData });
        } catch (error) {
            console.error('Error al obtener tipos de identificación:', error);
        }
    },
}));
