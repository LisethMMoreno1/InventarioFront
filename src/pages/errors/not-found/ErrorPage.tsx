import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/login");
  };

  return (
    <div>
      <div>404</div>
      <div>Página no encontrada</div>
      <div>La página que busca no existe.</div>
      <button onClick={handleGoHome}>Ir a Inicio</button>
    </div>
  );
};

export default ErrorPage;
