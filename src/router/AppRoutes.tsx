import { Bolt, Home, User } from "lucide-react";
import UserForm from "../componets/User/UserForm";
import SubPage2 from "../pages/SubPage2";
import UserTablePage from "../pages/UsersPages/UserTablePage";
import { RouteConfig } from "./RouteConfig";
import RolFormPage from "../pages/Rol/RolForm";
import DepartmentsFormsPage from "../pages/Department/DepartmentsForms";
import CityFormPage from "../pages/City/CityForm";
import TypeOfIdentificationsFormPage from "../pages/TypeOfIdentifications/TypeOfIdentificationsPage";

export const AppRoutes: RouteConfig[] = [
  {
    path: "/page1",
    name: "Página 1",
    icon: <Home />,
    children: [
      {
        path: "/page1/sub1",
        name: "Sub Página 1",
        component: <SubPage2 />,
        icon: <Home />,
      },
      { path: "/page1/sub2", name: "Sub Página 2", component: <SubPage2 /> },
    ],
  },
  {
    path: "/usuario",
    name: "Usuarios",
    icon: <User />,
    children: [
      {
        path: "/usuario/registrodeususario",
        name: "Registro de Usuario",
        component: <UserForm />,
      },
      {
        path: "/usuario/listadeusuarios",
        name: "Lista de Usuarios",
        component: <UserTablePage />,
      },
    ],
  },
  {
    path: "/globales",
    name: "Mantenimiento",
    icon: <Bolt />,
    children: [
      {
        path: "/globales/rolcreacion",
        name: "Roles",
        component: <RolFormPage />,
      },
      {
        path: "/globales/departamentocreacion",
        name: "Departamento ",
        component: <DepartmentsFormsPage />,
      },
      {
        path: "/globales/cuidadcreacion",
        name: "Cuidad",
        component: <CityFormPage />,
      },
      {
        path: "/globales/tipodeidentificacion",
        name: "Tipo de Identificacion",
        component: <TypeOfIdentificationsFormPage />,
      },
    ],
  },
];
