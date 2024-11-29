import { useFormik } from "formik";
import { DepartmentsFormSchema } from "../../Schemas/Department/departmentsSchema";
import { useDepartmentFormStore } from "../../store/Department/DepartmentStore";

export const useDepartmentForm = () => {
  const { department, setDepartment, submitDepartment } =
    useDepartmentFormStore();

  const formik = useFormik({
    initialValues: {
      Department: department.Department,
      codeDepartment: department.codeDepartment,
    },
    validationSchema: DepartmentsFormSchema,

    onSubmit: async (values, { resetForm }) => {
      setDepartment({
        Department: values.Department,
        codeDepartment: values.codeDepartment,
      });

      // Submitea el formulario a través del store
      await submitDepartment(
        () => {
          alert("Departamento registrado exitosamente");
          resetForm();
        },
        (errorMessage) => {
          alert(
            `Hubo un problema al registrar el Departamento: ${errorMessage}`
          );
        }
      );
    },
  });

  const inputClasses =
    "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelClasses = "block mb-2 text-sm font-medium text-gray-700";

  return { formik, inputClasses, labelClasses };
};
