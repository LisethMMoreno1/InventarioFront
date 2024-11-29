import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteConfig } from './router/RouteConfig';
import { AppRoutes } from './router/AppRoutes';
import ErrorPage from './pages/errors/not-found/ErrorPage';
import Layout from './pages/Layout';
import { WidgetP } from './pages/WidgetP';
import Login from './pages/login';


// Función para renderizar rutas
function renderRoutes(routes: RouteConfig[]): React.ReactElement[] {
  return routes.flatMap((route) => [
    route.component && (
      <Route
        key={route.path}
        path={route.path}
        element={route.component}
      />
    ),
    route.children ? renderRoutes(route.children) : null,
  ]) as React.ReactElement[];
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Rutas Privadas */}
        <Route element={<Layout />}>
          {renderRoutes(AppRoutes)}
          <Route path="/" element={<WidgetP />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
