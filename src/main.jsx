import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Principal from './components/principal.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Pagregistrohuesped from './components/pagregistrohuesped.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/registro" element={<Pagregistrohuesped />} />
        </Routes>
    </Router>,
)
