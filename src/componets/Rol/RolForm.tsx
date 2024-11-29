import { useFormik } from "formik";
import { RolFormSchema } from "../../Schemas/Rol/rolSchema";
import { postRoles } from "../../services/RolesService/RolesPostServices";
import { updateRole } from "../../services/RolesService/RolesPutServices";
import { useRolFormStore } from "../../store/Rol/RolFormStore";

export default function RolForm() {
  const { rol, resetRol } = useRolFormStore();

  const formik = useFormik({
    initialValues: rol,
    validationSchema: RolFormSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const rolRequest = {
          ...values,
        };

        if (rol.id) {
          await updateRole(rolRequest);
          alert("Rol actualizado exitosamente");
        } else {
          await postRoles(rolRequest);
          alert("Rol registrado exitosamente");
        }

        resetForm();
        resetRol();
      } catch (error: any) {
        alert(
          `Hubo un problema al ${rol.id ? "actualizar" : "registrar"} el rol: ${
            error.message
          }`
        );
      }
    },
  });

  const inputClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {rol.id ? "Editar Rol" : "Registrar Rol"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* typeOfRole */}
          <div>
            <label htmlFor="typeOfRole" className={labelClasses}>
              Nombre del Rol
            </label>
            <input
              type="text"
              id="typeOfRole"
              name="typeOfRole"
              value={formik.values.typeOfRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.typeOfRole && formik.errors.typeOfRole && (
              <div className="text-red-500 text-sm">
                {formik.errors.typeOfRole}
              </div>
            )}
          </div>

          {/* description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
        >
          {rol.id ? "Actualizar Rol" : "Registrar Rol"}
        </button>
      </form>
    </div>
  );
}
