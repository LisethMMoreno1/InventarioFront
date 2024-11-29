import { useFormik } from "formik";
import React, { useState } from "react";
import { postTypeOfIdentifications } from "../../services/IdentificationsService/TypeOfIdentificationsPostServices";
import { updateTypeOfIdentifications } from "../../services/TypeOfIdentificationsService/TypeOfIdentificationsUpdateServices";
import { useTypeOfIdentificationsStore } from "../../store/TypeOfIdentifications/TypeOfIdentificationsStore";
import { TypeOfIdentificationsFormSchema } from "../../Schemas/TypeOfIdentifications/TypeOfIdentificationsForm ";

const TypeOfIdentificationsForm: React.FC = () => {
  const { typeOfIdentifications, resetTypeOfIdentification } =
    useTypeOfIdentificationsStore();
  const [isEditing, setIsEditing] = useState(false); 
  const formik = useFormik({
    initialValues: typeOfIdentifications,
    validationSchema: TypeOfIdentificationsFormSchema,
    enableReinitialize: true, 
    onSubmit: async (values, { resetForm }) => {
      try {
        const rolRequest = { ...values };

        if (isEditing) {
          // Si está en modo edición, actualiza
          await updateTypeOfIdentifications(rolRequest);
          alert("Tipo de Identificación actualizado exitosamente");
        } else {
          // Si no está en modo edición, crea
          await postTypeOfIdentifications(rolRequest);
          alert("Tipo de Identificación registrado exitosamente");
        }

        resetForm();
        resetTypeOfIdentification();
        setIsEditing(false); // Desactivar el modo de edición tras enviar el formulario
      } catch (error: any) {
        alert(
          `Hubo un problema al ${
            isEditing ? "actualizar" : "registrar"
          } el Tipo de Identificación: ${error.message}`
        );
      }
    },
  });

  const handleEdit = () => {
    setIsEditing(true); // Activar el modo de edición
  };

  const inputClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isEditing
          ? "Editar Tipo de Identificación"
          : "Registrar Tipo de Identificación"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Nombre de la Tipo de Identificación */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Nombre de la Tipo de Identificación
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Código de la Tipo de Identificación */}
          <div>
            <label htmlFor="identifier" className={labelClasses}>
              Código de la Tipo de Identificación
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.identifier && formik.errors.identifier && (
              <div className="text-red-500 text-sm">
                {formik.errors.identifier}
              </div>
            )}
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
        >
          {isEditing ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {/* Botón para activar modo edición */}
      <button
        onClick={handleEdit}
        className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline transition duration-300"
      >
        Activar Edición
      </button>
    </div>
  );
};

export default TypeOfIdentificationsForm;
