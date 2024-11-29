import { PencilIcon, SearchIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { useMemo, useState } from "react";
import useRoles from "../../hooks/Rol/useRolForm";
import { deleteRoles } from "../../services/RolesService/RolesDeleteServices";
import RolEdit from "./RolEdit";

const RolTable: React.FC = () => {
  const { roles, loading, error } = useRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.typeOfRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const rolesToDisplay = useMemo(() => {
    return filteredRoles.slice(
      (currentPage - 1) * rolesPerPage,
      currentPage * rolesPerPage
    );
  }, [filteredRoles, currentPage, rolesPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRolesPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRolesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const toggleRolStatus = async (id: number) => {
    try {
      const response = await deleteRoles(id);
    } catch (error) {
      console.error("Error al eliminar el rol:", error);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openEditModal = (role: any) => {
    setRoleToEdit(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveRole = (updatedRole: any) => {
    console.log("Rol actualizado:", updatedRole);
    closeModal();
  };

  if (loading) {
    return <div className="loading">Cargando roles...</div>;
  }

  if (error) {
    return <div className="error">{`Error: ${error}`}</div>;
  }

  if (roles.length === 0) {
    return <div>No se encontraron roles</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-10xl">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight font-bold text-gray-900">
            Roles Registrados
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Buscar rol..."
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
                    Nombre Rol
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
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
                {rolesToDisplay.map((role: any) => (
                  <tr key={role.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {role.typeOfRole}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {role.description}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${
                          role.isActive ? "text-green-900" : "text-red-900"
                        } leading-tight`}
                      >
                        <span className="relative">
                          {role.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openEditModal(role)}
                        className="text-green-600 hover:text-green-900 mx-1"
                      >
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() =>
                          toggleRolStatus(role.id?.toString() || "0")
                        }
                        className={`${
                          role.isActive
                            ? "text-green-600 hover:text-green-900"
                            : "text-red-600 hover:text-red-900"
                        } transition-colors duration-200`}
                        title={role.isActive ? "Desactivar" : "Activar"}
                        disabled={loading}
                      >
                        {loading ? (
                          <span>Cargando...</span>
                        ) : role.isActive ? (
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

            <div className="px-5 py-3 bg-gray-200 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">
                  Total roles: {roles.length}
                </span>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="roles-per-page"
                  className="mr-2 text-sm font-semibold"
                >
                  Roles por página:
                </label>
                <select
                  id="roles-per-page"
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  onChange={handleRolesPerPageChange}
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
                  className="p-2"
                >
                  Anterior
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage * rolesPerPage >= roles.length}
                  className="p-2"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RolEdit
        isOpen={isModalOpen}
        onClose={closeModal}
        role={roleToEdit}
        onSave={saveRole}
      />
    </div>
  );
};

export default RolTable;
