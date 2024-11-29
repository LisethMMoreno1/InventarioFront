import {
  EyeIcon,
  PencilIcon,
  SearchIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";
import { useUsers } from "../../hooks/User/useUsers";
import { deleteUsers } from "../../services/UserService/UserDeleteServices";
import { UserGet } from "../../types/User/UserType";
import UserModal from "./UserModal";

const UserTable: React.FC = () => {
  const {
    users,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    paginate,
    handleUsersPerPageChange,
    totalPages,
    currentPage,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<UserGet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingq, setLoading] = useState(false);

  const handleViewDetails = (user: UserGet) => {
    setSelectedUser(user);
    setIsViewing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewing(false);
    setIsEditing(false);
    setSelectedUser(null);
  };
  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    setLoading(true);
    try {
      const response = await deleteUsers(userId, isActive ? 0 : 1);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const user: UserGet[] = [];

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight font-bold text-gray-900">
            Usuarios Registrados
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Buscar usuario..."
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                type="submit"
              >
                <SearchIcon size={16} className="inline mr-2" />
                Buscar
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Identificación
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.firstName} {user.firstLastName}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.typeOfIdentification.name}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {user.identificationNumber}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.phoneNumber}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{user.role.typeOfRole}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${
                          user.isActive ? "text-green-900" : "text-red-900"
                        } leading-tight`}
                      >
                        <span className="relative">
                          {user.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon size={20} />
                      </button>
                      <button
                        /*                         onClick={() => handleEditClick(user)} // Asegúrate de tener el objeto user aquí
                         */ className="text-green-600 hover:text-green-900 mx-1"
                      >
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() =>
                          toggleUserStatus(
                            user.identificationNumber?.toString() || "0",
                            user.isActive ?? false
                          )
                        }
                        className={`${
                          user.isActive
                            ? "text-green-600 hover:text-green-900"
                            : "text-red-600 hover:text-red-900"
                        } transition-colors duration-200`}
                        title={user.isActive ? "Desactivar" : "Activar"}
                        disabled={loading} // Deshabilitar el botón mientras se carga
                      >
                        {loading ? (
                          <span>Cargando...</span>
                        ) : user.isActive ? (
                          <ToggleRight size={16} />
                        ) : (
                          <ToggleLeft size={16} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mostrar el modal si isModalOpen es verdadero */}
            {isModalOpen && selectedUser && (
              <UserModal user={selectedUser} onClose={closeModal} />
            )}

            {/* Mostrar el modal si isModalOpen es verdadero */}
            {/*   {isModalOpen && selectedUser && (
              <EditUser
                user={selectedUser}
                onClose={handleCloseModal}
                onUpdate={handleUserUpdate}
              />
            )} */}
            <div className="px-5 py-3 bg-gray-200 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">
                  Total usuarios: {users.length}
                </span>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="users-per-page"
                  className="mr-2 text-sm font-semibold"
                >
                  Usuarios por página:
                </label>
                <select
                  id="users-per-page"
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  onChange={handleUsersPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Anterior
                </button>
                <span className="mx-2 text-sm font-semibold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
