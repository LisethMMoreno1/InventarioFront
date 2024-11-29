import { Link, useLocation } from 'react-router-dom';
import { RouteConfig } from '../../router/RouteConfig';
import { LogOut, Menu } from 'lucide-react';
import { useSidebar } from '../../hooks/Layout/useSidebar';

interface SidebarProps {
  routes: RouteConfig[];
}

const SidebarMenu = ({ routes }: SidebarProps) => {
  const location = useLocation();
  const { openMenus, isSidebarOpen, toggleMenu, toggleSidebar } = useSidebar();

  const renderSubMenu = (children: RouteConfig[], parentPath: string) => (
    <ul className="pl-4">
      {children.map((subRoute, index) => (
        <li key={index} className="mb-2">
          <Link
            to={subRoute.path}
            className={`flex p-2 rounded ${location.pathname === subRoute.path ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
          >
            {subRoute.icon && <span className="mr-2">{subRoute.icon}</span>}
            {subRoute.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col transition-width duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <button className="p-3 bg-gray-900 text-white" onClick={toggleSidebar}>
        <Menu />
      </button>

      {isSidebarOpen && (
        <>
          <div className="p-5 font-bold text-lg bg-gray-800">Mi Aplicación</div>
          <ul className="mt-4 p-4">
            {routes.map((route, index) => (
              <li key={index} className="mb-4">
                {route.children ? (
                  <>
                    <button
                      onClick={() => toggleMenu(route.path)}
                      className={`block p-2 rounded ${openMenus.includes(route.path) ? 'bg-gray-700' : 'hover:bg-gray-700'} w-full text-left flex justify-between`}
                    >
                      {route.icon && <span className="mr-2">{route.icon}</span>}
                      {route.name}
                      <span>{openMenus.includes(route.path) ? '▾' : '▸'}</span>
                    </button>
                    {openMenus.includes(route.path) && renderSubMenu(route.children, route.path)}
                  </>
                ) : (
                  <Link
                    to={route.path}
                    className={`block p-2 rounded ${location.pathname === route.path ? 'bg-gray-700' : 'hover:bg-gray-700'} w-full text-left flex justify-between`}
                  >
                    {route.icon && <span className="mr-2">{route.icon}</span>}
                    {route.name}
                    <span>{openMenus.includes(route.path) ? '▾' : '▸'}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="p-4 mt-auto">
        <button className="flex items-center justify-center p-2 rounded bg-red-600 hover:bg-red-700 w-full">
          <LogOut className="mr-2" />
          {isSidebarOpen && 'Cerrar Sesión'}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
