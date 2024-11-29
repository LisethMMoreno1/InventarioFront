import * as Yup from "yup";

export const TypeOfIdentificationsFormSchema = Yup.object({
  name: Yup.string().required("El nombre del tipo de identificacion es  obligatorio"),
  identifier: Yup.string().required("la descripción es obligatorio"),
});
