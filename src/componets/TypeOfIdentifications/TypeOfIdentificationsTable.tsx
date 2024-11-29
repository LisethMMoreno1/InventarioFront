import { useEffect, useMemo, useState } from "react";
import { PencilIcon, SearchIcon, Trash2 } from "lucide-react";
import { typeOfIdentification } from "../../types/TypeOfIdentification/typeOfIdentificationType";
import { deleteTypeOfIdentifications } from "../../services/IdentificationsService/TypeOfIdentificationsDeleteServices";
import { getTypeOfIdentifications } from "../../services/IdentificationsService/TypeOfIdentificationsGetServices"; // Asegúrate de importar tu servicio

const TypeOfIdentificationsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [typeOfIdentificationsPerPage, setTypeOfIdentificationsPerPage] =
    useState(10);
  const [typeOfIdentifications, setTypeOfIdentifications] = useState<
    Array<typeOfIdentification>
  >([]);

  useEffect(() => {
    const fetchTypeOfIdentifications = async () => {
      try {
        const response = await getTypeOfIdentifications();
        setTypeOfIdentifications(response);
      } catch (error) {
        console.error("Error al obtener las identificaciones:", error);
      }
    };

    fetchTypeOfIdentifications();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredTypeOfIdentifications = useMemo(() => {
    return typeOfIdentifications.filter(
      (typeOfIdentification) =>
        typeOfIdentification.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        typeOfIdentification.identifier
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [typeOfIdentifications, searchTerm]);

  const typeOfIdentificationsToDisplay = useMemo(() => {
    return filteredTypeOfIdentifications.slice(
      (currentPage - 1) * typeOfIdentificationsPerPage,
      currentPage * typeOfIdentificationsPerPage
    );
  }, [
    filteredTypeOfIdentifications,
    currentPage,
    typeOfIdentificationsPerPage,
  ]);

  const handleTypeOfIdentificationsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTypeOfIdentificationsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteTypeOfIdentification = async (id: number) => {
    try {
      await deleteTypeOfIdentifications(id); // Asegúrate de que el ID sea un número
      // Después de eliminar, vuelve a obtener las identificaciones
      const response = await getTypeOfIdentifications();
      setTypeOfIdentifications(response); // Actualiza el estado con los nuevos datos
    } catch (error) {
      console.error("Error al eliminar la identificación:", error);
    }
  };

  if (typeOfIdentifications.length === 0) {
    return <div>No se encontraron identificaciones</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-10xl">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight font-bold text-gray-900">
            Identificaciones Registradas
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Buscar Identificación..."
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
                    Nombre de la Identificación
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Código de la Identificación
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {typeOfIdentificationsToDisplay.map((typeOfIdentification) => (
                  <tr key={typeOfIdentification.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {typeOfIdentification.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {typeOfIdentification.identifier}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-green-600 hover:text-green-900 mx-1">
                        <PencilIcon size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteTypeOfIdentification(
                            typeOfIdentification.id ?? 0
                          )
                        } // Cambia 0 por un valor que tenga sentido
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
                  Total identificaciones: {typeOfIdentifications.length}
                </span>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="typeOfIdentifications-per-page"
                  className="mr-2 text-sm font-semibold"
                >
                  Identificaciones por página:
                </label>
                <select
                  id="typeOfIdentifications-per-page"
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  onChange={handleTypeOfIdentificationsPerPageChange}
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
                    currentPage * typeOfIdentificationsPerPage >=
                    typeOfIdentifications.length
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

export default TypeOfIdentificationsTable;
