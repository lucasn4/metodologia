// src/index.js
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Principal from './components/principal.jsx';
import Header from './components/header.jsx';
import Pagos from './routes/pagos.jsx';
import Stock from './routes/stock.jsx';
import Admin from './routes/Admin.jsx';
import Login from './routes/Login.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Componente para mostrar el Header solo en ciertas rutas
const ShowHeader = () => {
  const location = useLocation();
  return !['/admin', '/admin/stock', "/login", "/admin/habitaciones", "/admin/huespedes"].includes(location.pathname) ? <Header /> : null;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider> {/* Envolvemos toda la aplicación en AuthProvider para el manejo del estado de autenticación */}
      <BrowserRouter>
        <ShowHeader />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/login" element={<Login />} />
          
          {/* Usamos ProtectedRoute para proteger las rutas de admin */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute> {/* Envuelves la ruta con ProtectedRoute */}
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/stock" 
            element={
              <ProtectedRoute> {/* Envuelves la ruta con ProtectedRoute */}
                <Stock />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);


