import {
  PencilIcon,
  SearchIcon,
  Trash2
} from "lucide-react";
import { useMemo, useState } from "react";
import useDepartment from "../../hooks/Department/useDepartment";

const DepartmentsTable: React.FC = () => {
  const { departments, loading, error, deleteDepartments } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentsPerPage, setDepartmentsPerPage] = useState(10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    console.log("Término de búsqueda actualizado:", e.target.value);
  };

  const filteredDepartments = useMemo(() => {
    const filtered = departments.filter(
      (department) =>
        department.Department.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        department.codeDepartment
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    console.log("Departamentos filtrados:", filtered);
    return filtered;
  }, [departments, searchTerm]);

  const departmentsToDisplay = useMemo(() => {
    const display = filteredDepartments.slice(
      (currentPage - 1) * departmentsPerPage,
      currentPage * departmentsPerPage
    );
    console.log("Departamentos a mostrar:", display);
    return display;
  }, [filteredDepartments, currentPage, departmentsPerPage]);

  const handleDepartmentsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartmentsPerPage(Number(e.target.value));
    setCurrentPage(1);
    console.log("Departamentos por página actualizado:", e.target.value);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log("Página actualizada:", pageNumber);
  };

  const handleDeleteDepartment = (departmentsId: number) => {
    deleteDepartments(departmentsId);
  };

  if (loading) {
    console.log("Cargando departamentos...");
    return <div className="loading">Cargando Departamento...</div>;
  }

  if (error) {
    console.error("Error al cargar departamentos:", error);
    return <div className="error">{`Error: ${error}`}</div>;
  }

  if (departments.length === 0) {
    console.log("No se encontraron departamentos.");
    return <div>No se encontraron departamentos</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-10xl">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight font-bold text-gray-900">
            Departamentos Registrados
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Buscar Departamento..."
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
                    Nombre del Departamento
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Código del Departamento
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentsToDisplay.map((department: any) => (
                  <tr key={department.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {department.Department}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {department.codeDepartment}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-green-600 hover:text-green-900 mx-1">
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(department.id)}
                      >
                        <Trash2 size={16} style={{ color: "red" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-5 py-3 bg-gray-200 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-semibold">
                  Total departamentos: {departments.length}
                </span>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="departments-per-page"
                  className="mr-2 text-sm font-semibold"
                >
                  Departamentos por página:
                </label>
                <select
                  id="departments-per-page"
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  onChange={handleDepartmentsPerPageChange}
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
                  disabled={
                    currentPage * departmentsPerPage >= departments.length
                  }
                  className="p-2"
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

export default DepartmentsTable;
