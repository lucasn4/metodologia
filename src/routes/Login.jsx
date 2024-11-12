// src/routes/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../assets/styles/Login.module.css';  // Importa el archivo de estilos

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Por favor, ingresa usuario y contraseña');
      return;
    }

    try {
      login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.loginContainer}> {/* Contenedor centrado */}
      <div className={styles.formContainer}> {/* Formulario centrado */}
        <h1>Iniciar Sesión</h1>

        <div>
          <input
            type="text"
            className={styles.inputField}  // Clase para el campo de usuario
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className={styles.inputField}  // Clase para el campo de contraseña
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleLogin}>Iniciar Sesión</button>

        {error && <p className={styles.errorMessage}>{error}</p>} {/* Mensaje de error */}
      </div>
    </div>
  );
};

export default Login;
