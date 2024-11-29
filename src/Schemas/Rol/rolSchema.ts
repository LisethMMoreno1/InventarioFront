import * as Yup from "yup";

export const RolFormSchema = Yup.object({
    typeOfRole: Yup.string().required("El nombre del rol obligatorio"),
    description: Yup.string().required("la descripción es obligatorio"),
   
});