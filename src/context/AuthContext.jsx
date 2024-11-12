// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Crear contexto
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Componente que proporciona el contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado para saber si el usuario está autenticado
  const [user, setUser] = useState(null);                          // Estado para guardar el nombre del usuario

  // Función de login
  const login = (username, password) => {
    console.log('Intentando iniciar sesión con:', username, password);
    
    // Aquí debes validar las credenciales (puedes hacer la validación de acuerdo a tus necesidades)
    // Para este ejemplo, validaremos que el nombre de usuario sea 'admin' y la contraseña sea 'clave123'.
    if (username === 'a' && password === 'a') {
      setIsAuthenticated(true);  // Si la validación es exitosa, autenticamos al usuario
      setUser(username);         // Guardamos el nombre del usuario
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales incorrectas');
      throw new Error('Credenciales incorrectas');  // Lanza un error si las credenciales son incorrectas
    }
  };

  // Proveedor de contexto que pasa el estado y la función login a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
