import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const [formData, setFormData] = useState({
    usuarioE: '',
    contraseñaE: ''
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/registro'); // Redirige a la página principal al iniciar sesión
      } else {
        console.error('Inicio de sesión fallido:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <>
      <footer id="footer" className="footer position-relative light-background">
        <div className="container footer-top">
          <div className="row gy-4" id="footerid">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">SAMAY KITI</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Hipolito Yrigoyen s/n</p>
                <p>Amaicha del Valle, Tucuman</p>
                <p className="mt-3"><strong>Telefonos:</strong> <span>+54 9 381 648-9834 // 381 647-0160</span></p>
                <p><strong>Email:</strong> <span>-</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">Samay kiti</strong> <span>Todos los Derechos Reservados.</span></p>
          <div className="credits">
            Diseñado por <strong className="px-1 sitename">Grupo 7 - Comisión 7.</strong>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;