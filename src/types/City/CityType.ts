export default interface CityType {
  id?: number;
  cities: string;
  codeCities: string;
  departmentId: number;  // Cambiado a un solo número
  department?: {
    id: number;
    Department: string;
    codeDepartment: string;
  };
}
