import * as Yup from "yup";

export const DepartmentsFormSchema = Yup.object({
  Department: Yup.string().required(
    "El nombre del Departamento es  obligatorio"
  ),
  codeDepartment: Yup.string().required("la descripción es obligatorio"),
});
