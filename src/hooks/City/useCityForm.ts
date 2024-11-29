import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { CityFormSchema } from "../../Schemas/City/CitySchema";
import { deleteCityService } from "../../services/CityService/cityDeleteService";
import { getCity } from "../../services/CityService/cityGetService"; // Asegúrate de que postCity esté importada
import { postCity } from "../../services/CityService/cityPostService";
import { getDepartments } from "../../services/DepartmentService/departmentGetService";
import CityType from "../../types/City/CityType";

export const useCityForm = () => {
  const [cities, setCities] = useState<CityType[]>([]);
  const [departments, setDepartments] = useState<
    { id: number; Department: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener departamentos
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response);
      } catch (error) {
        console.error("Error al obtener los departamentos", error);
      }
    };
    fetchDepartments();
  }, []);

  // Obtener ciudades
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const data = await getCity();
        setCities(data);
      } catch (err) {
        setError("Error al cargar las ciudades");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const formik = useFormik({
    initialValues: {
      cities: "",
      codeCities: "",
      departmentId: "",
    },
    validationSchema: CityFormSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const cityRequest: CityType = {
          cities: values.cities,
          codeCities: values.codeCities,
          departmentId: Number(values.departmentId),
        };

        await postCity(cityRequest);

        alert("Ciudad registrada exitosamente");
        resetForm();

        const updatedCities = await getCity();
        setCities(updatedCities);
      } catch (errorMessage) {
        console.error("Error al registrar la ciudad", errorMessage);
        alert(`Hubo un problema al registrar la ciudad: ${errorMessage}`);
      }
    },
  });

  const deleteCity = async (cityId: number) => {
    try {
      const response = await deleteCityService(cityId);
      console.log("Ciudad eliminada con éxito:", response);
      setCities((prevCities) =>
        prevCities.filter((city) => city.id !== cityId)
      );
      setCities(response);
    } catch (error) {
      console.error("Error al eliminar la ciudad:", error);
    }
  };

  return { formik, departments, cities, loading, error, deleteCity };
};
