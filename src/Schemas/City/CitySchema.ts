import * as Yup from "yup";

export const CityFormSchema = Yup.object().shape({
  cities: Yup.string()
    .required("El nombre de la ciudad es obligatorio")
    .min(2, "El nombre de la ciudad debe tener al menos 2 caracteres"),
  codeCities: Yup.string()
    .required("El código de la ciudad es obligatorio")
    .matches(/^\d{3}$/, "El código de la ciudad debe tener 5 dígitos"),
  departmentId: Yup.number()
    .required("El departamento es obligatorio")
    .positive("El departamento debe ser un número positivo"),
});
