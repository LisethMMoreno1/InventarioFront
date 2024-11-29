import { useFormik } from "formik";
import { TypeOfIdentificationsFormSchema } from "../../Schemas/TypeOfIdentifications/TypeOfIdentificationsForm ";
import { useTypeOfIdentificationsStore } from "../../store/TypeOfIdentifications/TypeOfIdentificationsStore"; 
import { postTypeOfIdentifications } from "../../services/IdentificationsService/TypeOfIdentificationsPostServices";
import { updateTypeOfIdentifications } from "../../services/TypeOfIdentificationsService/TypeOfIdentificationsUpdateServices";

export const useTypeOfIdentificationsForm = () => {
  const { typeOfIdentifications, resetTypeOfIdentification } =
    useTypeOfIdentificationsStore();

  const formik = useFormik({
    initialValues: typeOfIdentifications,
    validationSchema: TypeOfIdentificationsFormSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const typeOfIdentificationsRequest = {
          ...values,
        };

        if (typeOfIdentifications.id) {
          await updateTypeOfIdentifications(typeOfIdentificationsRequest);
          alert("Rol actualizado exitosamente");
        } else {
          await postTypeOfIdentifications(typeOfIdentificationsRequest);
          alert("Rol registrado exitosamente");
        }
        resetTypeOfIdentification();
        resetForm();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    },
  });

  return { formik };
};
