import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes del enrutador

// Importación de los componentes necesarios
import Principal from './components/principal.jsx';

import Pagos from './routes/pagos.jsx'; 
import Stock from './routes/stock.jsx';
import Admin from './routes/Admin.jsx';
import Login from './routes/Login.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Pagregistrohuesped from './components/pagregistrohuesped.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider> {/* Envolvemos toda la aplicación en AuthProvider para el manejo del estado de autenticación */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Pagregistrohuesped />} />
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
