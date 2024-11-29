import React from "react";
import { useDepartmentForm } from "../../hooks/Department/useDepartmentForm";

const DepartmentsForm: React.FC = () => {
  const { formik, inputClasses, labelClasses } = useDepartmentForm();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Registrar Departamentos
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Nombre del Departamento */}
          <div>
            <label htmlFor="Department" className={labelClasses}>
              Nombre del Departamento
            </label>
            <input
              type="text"
              id="Department"
              name="Department"
              value={formik.values.Department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.Department && formik.errors.Department && (
              <div className="text-red-500 text-sm">
                {formik.errors.Department}
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="codeDepartment" className={labelClasses}>
              Codigo del Departamento
            </label>
            <input
              type="text"
              id="codeDepartment"
              name="codeDepartment"
              value={formik.values.codeDepartment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.codeDepartment && formik.errors.codeDepartment && (
              <div className="text-red-500 text-sm">
                {formik.errors.codeDepartment}
              </div>
            )}
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
        >
          Registrar Departamento
        </button>
      </form>
    </div>
  );
};

export default DepartmentsForm;
