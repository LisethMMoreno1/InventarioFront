import * as Yup from "yup";

export const UserFormSchema = Yup.object({
    typeOfIdentification: Yup.string().required("Tipo de Identificación es obligatoria"),
    identificationNumber: Yup.number().min(6, "El número de identificación debe tener al menos 6 carateres").required("El número de identificación es obligatorio"),
    firstName: Yup.string().required("El nombre de usuario es obligatorio").matches(/^[^\d]*$/, 'El primer nombre no puede contener números'),
    middleName: Yup.string().nullable().matches(/^[^\d]*$/, 'El segundo nombre no puede contener números'),
    firstLastName: Yup.string().required("El primer apellido de usuario es obligatorio").matches(/^[^\d]*$/, 'El primer nombre no puede contener números'),
    secondLastName: Yup.string().nullable().matches(/^[^\d]*$/, 'El  segundo apellido no puede contener números'),
    phoneNumber: Yup.number().min(6, "el numero debe tener al menos 6 caracteres").required("El número de telefono es obligatorio"),
    email: Yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es obligatorio'),
    typeOfRole: Yup.number().required("El rol de usuario es obligatorio"),
});