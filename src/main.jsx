import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes del enrutador
import './index.css';
import Principal from './components/principal.jsx';
import Header from './components/header.jsx';
import Pagos from './routes/pagos.jsx'; // Importa tu componente Pagos
import Stock from './routes/stock.jsx';
import Home from './routes/Home.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación con BrowserRouter */}
      <Header />
      <Routes> {/* Define las rutas aquí */}
        <Route path="/" element={<Principal />} /> {/* Ruta principal */}
        <Route path="/pagos" element={<Pagos />} /> {/* Ruta para /pagos */}
        <Route path="/admin/stock" element={<Stock />} /> {/* Ruta para /pagos */}
        <Route path="/admin" element={<Home/>} /> {/* Ruta para /pagos */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);