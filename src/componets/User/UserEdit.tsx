import { useEffect, useState } from 'react';
import { XIcon, User, Phone, Briefcase, Lock } from 'lucide-react';
import { getUsersById, updateUsers } from '../../services/UserService/UserPutServices';
import { UserPost } from '../../types/User/UserCreateType';
import { useUserFormData } from '../../hooks/User/useUserForm';
import { useUserFormStore } from '../../store/User/UserFormStore';

type UserData = {
    id: number,
    typeOfIdentificationId: number;
    identificationNumber: string;
    firstName: string;
    middleName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    email: string;
    genre: number;
    role: number;
    password: string;
    isActive: boolean;
};

export default function EditUser({ user, onClose }: { user: UserPost; onClose: () => void }) {
    useUserFormData();

    // Acceder a los datos desde el store
    const { roles, typeOfIdentifications, typeOfGenders } = useUserFormStore();

    const [initialValues, setInitialValues] = useState<UserData>({
        id: 0,
        typeOfIdentificationId: 0,
        identificationNumber: '',
        firstName: '',
        middleName: '',
        firstLastName: '',
        secondLastName: '',
        phoneNumber: '',
        email: '',
        genre: 0,
        role: 0,
        password: '',
        isActive: true,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsersById(user.id);
                setInitialValues({
                    id: 0,
                    typeOfIdentificationId: Number(response.typeOfIdentification), // Ajusta aquí según tu API
                    identificationNumber: response.identificationNumber,
                    firstName: response.firstName,
                    middleName: response.middleName,
                    firstLastName: response.firstLastName,
                    secondLastName: response.secondLastName,
                    phoneNumber: response.phoneNumber,
                    email: response.email,
                    genre: Number(response.genre.genre), // Ajusta aquí según tu API
                    role: Number(response.role.typeOfRole), // Ajusta aquí según tu API
                    password: response.password,
                    isActive: response.isActive ?? true,
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (user.id) fetchUsers();
    }, [user.id]);

    // Update the `updateUsers` call
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUsers(initialValues); // Asegúrate de que initialValues tenga todos los campos necesarios
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="edit-user-modal">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center pb-3">
                    <h3 className="text-2xl font-semibold text-gray-900">Editar Usuario</h3>
                    <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <XIcon size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <User className="mr-2" />
                                Información Personal
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="typeOfIdentificationId" className="block text-sm font-medium text-gray-700">Tipo de Identificación</label>
                                    <select
                                        id="typeOfIdentificationId"
                                        name="typeOfIdentificationId"
                                        value={initialValues.typeOfIdentificationId}
                                        onChange={(e) => setInitialValues({ ...initialValues, typeOfIdentificationId: parseInt(e.target.value, 10) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Seleccione Tipo de Documento</option>
                                        {typeOfIdentifications.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700">Número de Identificación</label>
                                    <input
                                        type="text"
                                        id="identificationNumber"
                                        name="identificationNumber"
                                        value={initialValues.identificationNumber}
                                        onChange={(e) => setInitialValues({ ...initialValues, identificationNumber: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Primer Nombre</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={initialValues.firstName}
                                        onChange={(e) => setInitialValues({ ...initialValues, firstName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Segundo Nombre</label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        name="middleName"
                                        value={initialValues.middleName}
                                        onChange={(e) => setInitialValues({ ...initialValues, middleName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstLastName" className="block text-sm font-medium text-gray-700">Primer Apellido</label>
                                    <input
                                        type="text"
                                        id="firstLastName"
                                        name="firstLastName"
                                        value={initialValues.firstLastName}
                                        onChange={(e) => setInitialValues({ ...initialValues, firstLastName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="secondLastName" className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                                    <input
                                        type="text"
                                        id="secondLastName"
                                        name="secondLastName"
                                        value={initialValues.secondLastName}
                                        onChange={(e) => setInitialValues({ ...initialValues, secondLastName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Género</label>
                                    <select
                                        id="genre"
                                        name="genre"
                                        value={initialValues.genre}
                                        onChange={(e) => setInitialValues({ ...initialValues, genre: parseInt(e.target.value, 10) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Seleccione Género</option>
                                        {typeOfGenders.map((type) => (
                                            <option key={type.id} value={type.id}>{type.genre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <Phone className="mr-2" />
                                Información de Contacto
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={initialValues.phoneNumber}
                                        onChange={(e) => setInitialValues({ ...initialValues, phoneNumber: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={initialValues.email}
                                        onChange={(e) => setInitialValues({ ...initialValues, email: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <Briefcase className="mr-2" />
                                Rol y Contraseña
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={initialValues.role}
                                        onChange={(e) => setInitialValues({ ...initialValues, role:  parseInt(e.target.value, 10)  })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Seleccione Rol</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.typeOfRole}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={initialValues.password}
                                        onChange={(e) => setInitialValues({ ...initialValues, password: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <Lock className="mr-2" />
                                Estado
                            </h4>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={initialValues.isActive}
                                    onChange={() => setInitialValues({ ...initialValues, isActive: !initialValues.isActive })}
                                    className="mr-2"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Activo</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-4">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
