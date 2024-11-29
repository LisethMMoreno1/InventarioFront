import { useFormik } from "formik";

import { UserFormSchema } from "../../Schemas/Users/usersSchema";
import { UserPost } from "../../types/User/UserCreateType";
import { PostUsers } from "../../services/UserService/UserPotsServices";
import { useUserFormStore } from "../../store/User/UserFormStore";
import { useUserFormData } from "../../hooks/User/useUserForm";

export default function UserForm() {
  useUserFormData();

  const { roles, typeOfIdentifications, typeOfGenders } = useUserFormStore();

  const formik = useFormik({
    initialValues: {
      typeOfIdentification: "",
      identificationNumber: "",
      firstName: "",
      middleName: "",
      firstLastName: "",
      secondLastName: "",
      phoneNumber: "",
      email: "",
      genre: "",
      typeOfRole: "",
      password: "",
    },
    validationSchema: UserFormSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userRequest: UserPost = {
          id: 0,
          typeOfIdentificationId: Number(values.typeOfIdentification),
          identificationNumber: values.identificationNumber,
          firstName: values.firstName,
          middleName: values.middleName,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          genre: Number(values.genre),
          role: Number(values.typeOfRole),
          password: values.password,
        };

        const response = await PostUsers(userRequest);

        alert("Usuario registrado exitosamente");
        resetForm();
      } catch (error: any) {
        alert(`Hubo un problema al registrar el usuario: ${error.message}`);
      }
    },
  });


// Clases para los estilos
  const inputClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";
  const selectClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Registro de Usuarios
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Tipo de Identificación */}
          <div>
            <label htmlFor="typeOfIdentification" className={labelClasses}>
              Tipo de Identificación
            </label>
            <select
              id="typeOfIdentification"
              name="typeOfIdentification"
              value={formik.values.typeOfIdentification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={selectClasses}
              required
            >
              <option value="">Seleccione Tipo de Documento</option>
              {typeOfIdentifications.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {formik.touched.typeOfIdentification &&
              formik.errors.typeOfIdentification && (
                <div className="text-red-500 text-sm">
                  {formik.errors.typeOfIdentification}
                </div>
              )}
          </div>

          {/* Número de Identificación */}
          <div>
            <label htmlFor="identificationNumber" className={labelClasses}>
              Número de Identificación
            </label>
            <input
              type="text"
              id="identificationNumber"
              name="identificationNumber"
              value={formik.values.identificationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.identificationNumber &&
              formik.errors.identificationNumber && (
                <div className="text-red-500 text-sm">
                  {formik.errors.identificationNumber}
                </div>
              )}
          </div>

          {/* Primer Nombre */}
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              Primer Nombre
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          {/* Segundo Nombre */}
          <div>
            <label htmlFor="middleName" className={labelClasses}>
              Segundo Nombre
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
            />
            {formik.touched.middleName && formik.errors.middleName && (
              <div className="text-red-500 text-sm">
                {formik.errors.middleName}
              </div>
            )}
          </div>

          {/* Primer Apellido */}
          <div>
            <label htmlFor="firstLastName" className={labelClasses}>
              Primer Apellido
            </label>
            <input
              type="text"
              id="firstLastName"
              name="firstLastName"
              value={formik.values.firstLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.firstLastName && formik.errors.firstLastName && (
              <div className="text-red-500 text-sm">
                {formik.errors.firstLastName}
              </div>
            )}
          </div>

          {/* Segundo Apellido */}
          <div>
            <label htmlFor="secondLastName" className={labelClasses}>
              Segundo Apellido
            </label>
            <input
              type="text"
              id="secondLastName"
              name="secondLastName"
              value={formik.values.secondLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
            />
            {formik.touched.secondLastName && formik.errors.secondLastName && (
              <div className="text-red-500 text-sm">
                {formik.errors.secondLastName}
              </div>
            )}
          </div>

          {/* Número de Teléfono */}
          <div>
            <label htmlFor="phoneNumber" className={labelClasses}>
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
              pattern="[0-9]{10}"
              title="Ingrese un número de teléfono válido de 10 dígitos"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>


          {/* Género */}
          <div>
            <label htmlFor="genre" className={labelClasses}>
              Género
            </label>
            <select
              id="genre"
              name="genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={selectClasses}
              required
            >
              <option value="">Seleccione Género</option>
              {typeOfGenders.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.genre}
                </option>
              ))}
            </select>
            {formik.touched.genre && formik.errors.genre && (
              <div className="text-red-500 text-sm">{formik.errors.genre}</div>
            )}
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="typeOfRole" className={labelClasses}>
              Rol
            </label>
            <select
              id="typeOfRole"
              name="typeOfRole"
              value={formik.values.typeOfRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={selectClasses}
              required
            >
              <option value="">Seleccione Rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.typeOfRole}
                </option>
              ))}
            </select>
            {formik.touched.typeOfRole && formik.errors.typeOfRole && (
              <div className="text-red-500 text-sm">
                {formik.errors.typeOfRole}
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className={labelClasses}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClasses}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
        >
          Registrar Usuario
        </button>
      </form>
    </div>
  );
}
