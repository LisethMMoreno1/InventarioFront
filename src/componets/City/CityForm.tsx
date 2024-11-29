import React from "react";
import { useCityForm } from "../../hooks/City/useCityForm";
import { useCityStore } from "../../store/City/CityStore";

const CityForm: React.FC = () => {
  const { formik, departments } = useCityForm();
  const addCity = useCityStore((state: any) => state.addCity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
    addCity(formik.values); // Agregar la ciudad a la store
  };
  const inputClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Registrar Ciudad
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Nombre de la ciudad */}
          <div>
            <label htmlFor="cities" className={labelClasses}>
              Nombre de la ciudad
            </label>
            <input
              type="text"
              id="cities"
              name="cities"
              value={formik.values.cities}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.cities && formik.errors.cities && (
              <div className="text-red-500 text-sm">{formik.errors.cities}</div>
            )}
          </div>

          {/* Código de la ciudad */}
          <div>
            <label htmlFor="codeCities" className={labelClasses}>
              Código de la ciudad
            </label>
            <input
              type="text"
              id="codeCities"
              name="codeCities"
              value={formik.values.codeCities}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.codeCities && formik.errors.codeCities && (
              <div className="text-red-500 text-sm">
                {formik.errors.codeCities}
              </div>
            )}
          </div>

          {/* Selector de departamento */}
          <div>
            <label htmlFor="departmentId" className={labelClasses}>
              Departamento
            </label>
            <select
              id="departmentId"
              name="departmentId"
              value={formik.values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            >
              <option value="">Seleccione un departamento</option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.Department}
                </option>
              ))}
            </select>
            {formik.touched.departmentId && formik.errors.departmentId && (
              <div className="text-red-500 text-sm">
                {formik.errors.departmentId}
              </div>
            )}
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
        >
          Registrar Ciudad
        </button>
      </form>
    </div>
  );
};

export default CityForm;
