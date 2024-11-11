import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes del enrutador
import './index.css';
import Principal from './components/principal.jsx';
import Header from './components/header.jsx';
import Pagos from './routes/pagos.jsx'; // Importa tu componente Pagos
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Principal from './components/principal.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Pagregistrohuesped from './components/pagregistrohuesped.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación con BrowserRouter */}
      <Header />
      
      <Routes> {/* Define las rutas aquí */}
        <Route path="/" element={<Principal />} /> {/* Ruta principal */}
        <Route path="/pagos" element={<Pagos />} /> {/* Ruta para /pagos */}
        
      </Routes>

    </BrowserRouter>
  </StrictMode>,
);
createRoot(document.getElementById('root')).render(
  <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/registro" element={<Pagregistrohuesped />} />
        </Routes>
    </Router>,
)
