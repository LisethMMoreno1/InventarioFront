import React, { useEffect, useState } from 'react';
import { UserGet } from '../../types/User/UserType';
import { EyeIcon, XIcon } from 'lucide-react';

interface UserModalProps {
  user: UserGet;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const [selectedUser, setSelectedUser] = useState<UserGet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Sync the selectedUser state with the user prop whenever it changes
    setSelectedUser(user);
    setIsModalOpen(true);
  }, [user]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    onClose();
  };

  return (
    <div>
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-xl font-semibold text-gray-900">Detalles del Usuario</h3>
              <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <XIcon size={20} />
              </button>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Identificación</label>
                  <input type="text" value={selectedUser.typeOfIdentification.name} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número de Identificación</label>
                  <input type="text" value={selectedUser.identificationNumber} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primer Nombre</label>
                  <input type="text" value={selectedUser.firstName} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Segundo Nombre</label>
                  <input type="text" value={selectedUser.middleName} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primer Apellido</label>
                  <input type="text" value={selectedUser.firstLastName} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                  <input type="text" value={selectedUser.secondLastName} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="text" value={selectedUser.phoneNumber} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="text" value={selectedUser.email} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Género</label>
                  <input type="text" value={selectedUser.genre.genre} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rol</label>
                  <input type="text" value={selectedUser.role.typeOfRole} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <input type="text" value={selectedUser.isActive ? 'Activo' : 'Inactivo'} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModal;
