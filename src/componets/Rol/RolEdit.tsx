// RolEdit.tsx
import React, { useState, useEffect } from "react";

interface RolEditProps {
  isOpen: boolean;
  onClose: () => void;
  role: any;
  onSave: (updatedRole: any) => void;
}

const RolEdit: React.FC<RolEditProps> = ({ isOpen, onClose, role, onSave }) => {
  const [roleData, setRoleData] = useState(role);

  useEffect(() => {
    setRoleData(role);
  }, [role]);

  const handleSave = () => {
    onSave(roleData); // Pasar los datos actualizados al componente principal
    onClose(); // Cerrar el modal después de guardar
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  if (!isOpen) return null; // No renderizar el modal si no está abierto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Editar Rol
        </h2>

        <div className="mb-4">
          <label
            htmlFor="typeOfRole"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Rol
          </label>
          <input
            type="text"
            name="typeOfRole"
            id="typeOfRole"
            value={roleData?.typeOfRole || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Escribe el nombre del rol"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={roleData?.description || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Escribe la descripción del rol"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolEdit;
