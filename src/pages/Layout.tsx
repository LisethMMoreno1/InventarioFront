import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { RouteConfig } from "../router/RouteConfig";
import { ReactElement } from "react";
import Sidebar from "../componets/Layout/Sidebar";
import Header from "../componets/Layout/Header";
import { WidgetP } from "./WidgetP";


function renderRoutes(routes: RouteConfig[]): ReactElement[] {
  return routes.flatMap((route) => [
    route.component && (
      <Route
        key={route.path}
        path={route.path}
        element={route.component}
      />
    ),
    route.children ? renderRoutes(route.children) : null,
  ]) as ReactElement[];
}

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar routes={AppRoutes} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-auto">
          <Routes>
            {renderRoutes(AppRoutes)}
            <Route path="/" element={<WidgetP />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Layout;
