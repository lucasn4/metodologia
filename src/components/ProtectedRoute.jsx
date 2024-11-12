// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

  // Si no está autenticado, redirige a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el contenido protegido
  return children;
};

export default ProtectedRoute;
