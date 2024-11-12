import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes del enrutador

// Importación de los componentes necesarios
import Principal from './components/principal.jsx';

import Pagos from './routes/pagos.jsx'; 
import Pagregistrohuesped from './components/pagregistrohuesped.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación con BrowserRouter */}
      
      <Routes> {/* Define las rutas aquí */}
        <Route path="/" element={<Principal />} /> {/* Ruta principal */}
        <Route path="/pagos" element={<Pagos />} /> {/* Ruta para /pagos */}
        <Route path="/registro" element={<Pagregistrohuesped />} /> {/* Ruta para registro de huesped */}
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
